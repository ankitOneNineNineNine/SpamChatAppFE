import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MessageView from "../components/message.component";
import MessageDividers from "../components/messageDivider.component";
import {
  CircularProgress,
  Divider,
  List,
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
}));

function Home() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:650px)");
  const msgRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const { messages, setMsg } = useContext(MsgContext);

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
    setTextMsg("");
    setImages([]);
    setMsg([...messages, msg]);
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
    console.log(messages);
    if (messages.length) {
      filteredMessages = messages.filter(
        (msg) =>
          msg.from._id === currentMsging._id ||
          msg.toInd._id === currentMsging._id ||
          msg.toGrp?._id === currentMsging._id
      );
    }
  }

  return (
    <div className={classes.root}>
      <LDrawer user={user} />
      <Grid container spacing={3}>
        <Grid item xs className={classes.info}>
          <Profile user={currentMsging} />
          <MessageDividers />
        </Grid>
        <Grid item xs={matches ? 6 : 12}>
          <Typography variant="h6" className={classes.fname}>
            {currentMsging.fullname}
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
    </div>
  );
}

export default Home;
