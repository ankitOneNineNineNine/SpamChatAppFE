import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MessageView from "../components/message.component";
import MessageDividers from "../components/messageDivider.component";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import {
  CircularProgress,
  Divider,
  Fab,
  List,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import Profile from "../components/profile.component";
import AppBar from "../components/Drawer.component";
import FriendsList from "../components/friendsList.component";
import InputMessage from "../components/inputMessage.component";
import LDrawer from "../components/Drawer.component";
import { useDispatch, useSelector } from "react-redux";
import { MsgContext } from "../contexts/message.context";
import { SocketContext } from "../contexts/socket.context";
import { setCurrentMessaging } from "../common/actions";
import * as io from "socket.io-client";
import { POST } from "../adapters/http.adapter";
import { displayError } from "../common/toaster";
import CreateGroup from "../components/createGroup.component";
import Tesseract from 'tesseract.js';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import * as tf from '@tensorflow/tfjs';


const useStyles = makeStyles((theme) => ({
  messageList: {
    height: ({ images }) => images.length ? '70vh' : '78vh',
    overflowY: "scroll",
    overflowX: "hidden",
    scrollbarWidth: "none",
    backgroundColor: theme.palette.background.paper,
    padding: "5px",
    [theme.breakpoints.down("850")]: {
      height: ({ images }) => images.length ? '63vh' : '68vh'
    },
    [theme.breakpoints.down("650")]: {
      height: ({ images }) => images.length ? '58vh' : '60vh'
    },

  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  friendsList: {
    [theme.breakpoints.down("850")]: {
      display: "none",
    },
  },
  info: {
    marginTop: "10px",
    height: "90vh",
    overflowY: "scroll",
    [theme.breakpoints.down("650")]: {
      display: "none",
    },
  },
  fname: {
    textAlign: "center",
    fontWeight: "bolder",
  },
  groupCreate: {
    position: "absolute",
    bottom: "15%",
    right: "0",
  },
}));

function Home() {
  const matches = useMediaQuery("(min-width:650px)");
  const [textMsg, setTextMsg] = useState("");
  const [images, setImages] = useState([]);
  const msgRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const { messages, setMsg } = useContext(MsgContext);
  const currentMsging = useSelector((state) => state.currentMsging.info);
  const { socket, setSocket } = useContext(SocketContext);
  const [createGroup, setCreateGroup] = useState(false);
  const [spam, setSpam] = useState(false)
  const dispatch = useDispatch();
  const classes = useStyles({ images });
  const location = useLocation();

  useEffect(() => {
    let currentMsgingLocal = JSON.parse(localStorage.getItem("currentMsging"));
    if (currentMsgingLocal) {
      dispatch(setCurrentMessaging(currentMsgingLocal));
    } else if (user) {
      dispatch(setCurrentMessaging(user.friends[0]));
    }
  }, [user]);
  useEffect(() => {
    if (msgRef.current) {
      let ht = msgRef.current.scrollHeight;
      msgRef.current.scrollTo({ top: ht });
    }
  }, [msgRef, messages, currentMsging]);

  const messageChange = (text) => {
    setTextMsg(text);
  };
  const removeImage = (i) => {
    let imgs = [...images];
    imgs.splice(i, 1);

    setImages(imgs);
  };

  const modelInit = async () => {
    class L2 {

      static className = 'L2';

      constructor(config) {
        return tf.regularizers.l1l2(config)
      }
    }
    tf.serialization.registerClass(L2);

    var model = await tf.loadLayersModel(`/NEWJSON2/model.json`);

    return model;
  }
  const imageSpamClassify = (image) => {
    return new Promise((res, rej) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 224;
      canvas.height = 224;
      let canvImg = new Image();
      canvImg.src = URL.createObjectURL(image)
      console.log(image)
      canvImg.onload = async () => {
        console.log('here')
        ctx.drawImage(canvImg, 0, 0)
        const tensor = tf.browser
          .fromPixels(canvas)
          // .div(255)
          .toFloat()
          .expandDims(0);

        let model = await modelInit();

        let prediction = await model.predict(tensor)
        let predVal = prediction.arraySync()[0][0]
        let result = predVal ? 'spam' : 'ham';

        res(result)

      };
    })
  }
  const messageSend = async () => {
    if (!textMsg.length && !images.length) {
      return;
    }
    if (images.length > 1) {
      displayError('Please only send atmost 2 images at a time');
      return
    }

    if (images.length) {

      let formData = new FormData();
      formData.append("textMsg", textMsg);
      formData.append("from", user._id);
      if (currentMsging.fullname) {
        formData.append("toInd", currentMsging._id);
      } else {
        formData.append("toGrp", currentMsging._id);
      }

      for (let i = 0; i < images.length; i++) {
        let image = images[i];
        formData.append("images", image);
        let pred = await imageSpamClassify(image);
        if (pred !== 'ham') {
          formData.append("prediction", result.Prediction)
          break;
        }

        let { data: { text } } = await Tesseract.recognize(
          image,
          'eng',
          { logger: m => { } }
        )
        let result = await POST(`http://localhost:8000/predict?line=${text}`);
        // console.log(text)
        if (result.prediction !== 'ham') {
          formData.append("prediction", result.Prediction)
          break;
        }
      }

      POST("/messages/", formData, true, "multipart/form-data")
        .then((data) => {
          socket.emit("imgMsg", data)
          setImages([])
        })
        .catch((err) => {
          console.log(err)
          setImages([])
          displayError(err?.response?.data?.message)
        });
    } else {
      let result = await POST(`http://localhost:8000/predict?line=${textMsg}`);

      let receiver = currentMsging.fullname
        ? {
          toInd: currentMsging._id,
        }
        : {
          toGrp: currentMsging._id,
        };
      let msg = {
        ...receiver,
        from: user._id,
        text: textMsg,
        prediction: result.Prediction
      };
      socket.emit("msgS", msg);
    }
    setTextMsg("");
    setImages([]);
  };
  const imageSelect = (e) => {
    if (images.length > 3) {
      alert('Only 3 images at a time is allowed!!')
    }
    else if (e.target.files.length > 3) {
      alert('Only 3 images at a time is allowed!!')
    }
    else {
      setImages([...images, ...e.target.files]);
    }
  };

  if (!user) {
    return <CircularProgress />;
  }
  if (!currentMsging) {
    return (
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Make Friends and Chat with them
      </Typography>
    );
  }



  let filteredMessages = [];
  if (currentMsging && currentMsging._id) {
    if (messages.length) {
      filteredMessages = messages.filter((msg) => {
        if (currentMsging.name) {
          if (msg.toGrp) {
            return msg.toGrp._id === currentMsging._id
          }
        } else {
          if (msg.toInd) {
            if (
              msg.toInd._id === currentMsging._id ||
              (msg.from._id === currentMsging._id && msg.toInd._id === user._id)

            ) {
              return true;
            }
          }
        }
        return false;
      });
    }
  }

  const dispMessage = filteredMessages.filter(msg => msg.prediction === location.search.replace('?', ''))
  // console.log(filteredMessages, dispMessage)
  return (
    <div className={classes.root}>

      <LDrawer user={user} />
      <CreateGroup />
      <Grid container spacing={3}>
        <Grid item xs className={classes.info}>
          <Profile user={currentMsging} />
          <MessageDividers />
        </Grid>
        <Grid item xs={matches ? 6 : 12}>
          <Typography variant="h6" className={classes.fname}>
            {currentMsging.fullname
              ? currentMsging.fullname
              : currentMsging.name}
          </Typography>
          <Divider />
          <List className={classes.messageList} ref={msgRef}>
            {dispMessage.map((message, i) => {
              return <MessageView key={i} message={message} user={user} />;
            })}
          </List>
          <InputMessage
            messageSend={messageSend}
            messageChange={messageChange}
            imageSelect={imageSelect}
            removeImage={removeImage}
            images={images}
            textMsg={textMsg}
          />
        </Grid>
        <Grid item xs className={classes.friendsList}>
          <FriendsList
            friends={user ? user.friends : []}
            groups={user ? user.groups : []}
          />
        </Grid>
      </Grid>
      <Tooltip title="Create A Group">
        <Fab
          color="primary"
          aria-label="add"
          className={classes.groupCreate}
          onClick={() => {
            setCreateGroup(true);
          }}
        >
          <GroupAddIcon />
        </Fab>
      </Tooltip>
      {createGroup ? (
        <CreateGroup
          createGroup={createGroup}
          setCreateGroup={setCreateGroup}
        />
      ) : null}
    </div>
  );
}

export default Home;
