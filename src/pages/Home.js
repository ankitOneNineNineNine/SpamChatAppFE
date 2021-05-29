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
const useStyles = makeStyles((theme) => ({
  messageList: {
    height: "71vh",
    overflowY: "scroll",
    overflowX: "hidden",
    scrollbarWidth: "none",
    backgroundColor: theme.palette.background.paper,
    padding: "5px",
    [theme.breakpoints.down("850")]: {
      height: "63vh",
    },
    [theme.breakpoints.down("650")]: {
      height: "65vh",
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
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:650px)");
  const msgRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const { messages, setMsg } = useContext(MsgContext);
  const [createGroup, setCreateGroup] = useState(false);
  const currentMsging = useSelector((state) => state.currentMsging.info);
  const dispatch = useDispatch();
  const { socket, setSocket } = useContext(SocketContext);

  useEffect(() => {
    if (user) {
      dispatch(setCurrentMessaging(user.friends[0]));
    }
  }, [user]);
  useEffect(() => {
    if (msgRef.current) {
      let ht = msgRef.current.scrollHeight;
      msgRef.current.scrollTo({ top: ht });
    }
  }, [msgRef, messages]);

  const [textMsg, setTextMsg] = useState("");
  const [images, setImages] = useState([]);

  const messageChange = (text) => {
    setTextMsg(text);
  };
  const removeImage = (i) => {
    let imgs = [...images];
    imgs.splice(i, 1);

    setImages(imgs);
  };
  const messageSend = () => {
    if (!textMsg.length && !images.length) {
      return;
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
      images.forEach((image) => {
        formData.append("images", image);
      });
      POST("/messages/", formData, true, "multipart/form-data")
        .then((data) => socket.emit("imgMsg", data))
        .catch((err) => displayError(err?.response?.data?.message));
    } else {
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
      };
      socket.emit("msgS", msg);
    }
    setTextMsg("");
    setImages([]);
  };
  const imageSelect = (e) => {
    setImages([...images, ...e.target.files]);
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
            return msg.toGrp._id === currentMsging._id;
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
            {filteredMessages.map((message, i) => {
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
