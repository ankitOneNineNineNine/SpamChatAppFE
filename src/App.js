import React, { useEffect, useRef, useState } from "react";
import AppRouter from "./Routing/app.routing";
import "./styles/scrollBar.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./common/actions";
import * as io from "socket.io-client";
import { MsgContextProvider } from "./contexts/message.context";
import { SocketContextProvider } from "./contexts/socket.context";
import { NotifContextProvider } from "./contexts/notification.context";
import { GET, PUT, REMOVE } from "./adapters/http.adapter";
import { displaySuccess } from "./common/toaster";
import { BEURL } from "./config";
import { ChangeHistory } from "@material-ui/icons";
function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const user = useSelector((state) => state.user.user);
  const currentMsging = useSelector((state) => state.currentMsging.info);
  const [msgRing, setMsgRing] = useState(null);
  useEffect(() => {
    let ring = new Audio(process.env.PUBLIC_URL + "/newMsg.mp3");
    setMsgRing(ring);
  }, []);
  const seenMessage = () => {
    let msg = messages;

    let filterMsg = messages.filter(
      (m) => m.from?._id === currentMsging?._id && !m.seen
    );

    filterMsg.forEach(async (ms) => {
      let i = msg.findIndex((m) => m._id === ms._id);
      msg[i]["seen"] = true;
      setMessages([...msg]);
      if (ms._id) {
        let done = await PUT(`/messages/${ms._id}`, { seen: true }, true);
      }
    });
  };

  useEffect(() => {
    seenMessage();
  }, [currentMsging?._id]);

  useEffect(() => {
    seenMessage();
  }, [messages.length]);

  useEffect(() => {
    let hash = localStorage.getItem("i_hash");
    if (hash && (!user || Object.keys(user).length)) {
      dispatch(setUser({ token: hash }));
    }

    if (hash) {
      let s = io(BEURL, {
        auth: {
          token: localStorage.getItem("i_hash"),
        },
      });
      s.emit("user", user);
      setSocket(s);
    }
  }, [localStorage.getItem("i_hash")]);

  useEffect(() => {
    GET("/messages", true).then((m) => {
      setMessages([...m]);
    });
    GET("/notifs", true).then((n) => {
      setNotifs([...n]);
    });
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("status", (msg) => {
        console.log(msg);
        let hash = localStorage.getItem("i_hash");
        dispatch(setUser({ token: hash }));
      });
      socket.on("msgR", function (msg) {
        if (messages.findIndex((ms) => ms._id !== msg._id) < 0) {
          if (msg.from._id !== user?._id) {
            msgRing
              .play()
              .then((_) => {})
              .catch((_) => {});
          }
          setMessages((state) => [...state, msg]);
        }
      });
      socket.on("friendReqReceived", function (notification) {
        if (notifs.findIndex((ms) => ms._id !== notification._id)) {
          setNotifs((state) => [...state, notification]);
        }
      });
      socket.on("newGroupCreated", function (msg) {
        dispatch(setUser({ token: localStorage.getItem("i_hash") }));
      });
      socket.on("doneFr", async (msg) => {
        displaySuccess(msg.msg);
        dispatch(setUser({ token: localStorage.getItem("i_hash") }));
        let newNotifs = await PUT(
          `/notifs/${msg.id}`,
          { accepted: true },
          true
        );
        let ntfs = notifs;
        let i = ntfs.findIndex((n) => n._id === msg._id);
        ntfs[i] = newNotifs.accepted;
        setNotifs(ntfs);
      });
      socket.on("newFriend", async (msg) => {
        displaySuccess(msg.msg);
        dispatch(setUser({ token: localStorage.getItem("i_hash") }));
        GET("/notifs", true).then((n) => {
          setNotifs([...n]);
        });
      });
    }
  }, [socket]);

  return (
    <>
      <SocketContextProvider socket={{ socket, setSocket }}>
        <MsgContextProvider messages={{ messages, setMsg: setMessages }}>
          <NotifContextProvider
            notifs={{ notifications: notifs, setNotifications: setNotifs }}
          >
            <AppRouter />
          </NotifContextProvider>
        </MsgContextProvider>
      </SocketContextProvider>

      <ToastContainer />
    </>
  );
}

export default App;
