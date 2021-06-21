import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Portal from "@material-ui/core/Portal";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import MessageView from "../components/message.component";
import { PUT } from "../adapters/http.adapter";
import { MsgContext } from "../contexts/message.context";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMessaging } from "../common/actions";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    zIndex: 99,
    marginTop: "20px",
    width: "400px",
    margin: "auto",
    position: "fixed",
    right: "0px",
    borderRadius: "2px",
    border: "1px solid blue",
    top: "45px",
    backgroundColor: "white",
    [theme.breakpoints.down("850")]: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  msgLst: {
    maxHeight: "600px",
    overflowY: "scroll",
    backgroundColor: "white",
  },
}));

export default function NewMessage({ history }) {
  const classes = useStyles();
  const { messages, setMsg } = useContext(MsgContext);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const sentmid = (message) => {
    seenMessage(message.from);
    dispatch(setCurrentMessaging(message.from));
    localStorage.setItem("currentMsging", JSON.stringify(message.from));
    history.push("/");
  };

  const seenMessage = (from) => {
    let msg = messages;

    let UnseenMsgFrom = msg.filter((m) => m.from._id === from._id && !m.seen);
    UnseenMsgFrom.forEach(async (msgs) => {
      let i = messages.findIndex((m) => m._id === msgs._id);
      msg[i]["seen"] = true;
      setMsg([...msg]);
      if (msgs._id) {
        try {
  
          let done = await PUT(`/messages/${msgs._id}`, { seen: true }, true);
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  let notSeenMsgs = messages.filter(
    (m) => !m.seen && m?.from?._id !== user._id
  );
  let notificationMessages = [];
  notSeenMsgs.forEach((msg) => {
    let i = notificationMessages.findIndex(
      (ib) => ib.from?._id === msg.from?._id
    );
    if (i > -1) {
      notificationMessages[i] = msg;
    } else {
      notificationMessages.push(msg);
    }
  });

  return (
    <div className={classes.dropdown}>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        New Messages
      </Typography>
      <Divider />
      <List className={classes.messageList}>
        {notificationMessages.map((message, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                sentmid(message);
              }}
            >
              <MessageView msgNots={true} message={message} user={user} />
            </div>
          );
        })}
      </List>
    </div>
  );
}
