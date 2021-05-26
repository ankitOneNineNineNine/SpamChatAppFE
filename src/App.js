import React, { useEffect, useState } from "react";
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
import { GET } from "./adapters/http.adapter";
import { displaySuccess } from "./common/toaster";
function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    let hash = localStorage.getItem("i_hash");
    if (hash) {
      dispatch(setUser({ token: hash }));
    }
    let s = io("http://localhost:8000", {
      auth: {
        token: localStorage.getItem("i_hash"),
      },
    });
    setSocket(s);
  }, []);

  useEffect(() => {
    GET("/user/messages", true).then((m) => {
      setMessages([...m]);
    });
    GET("/user/notifications", true).then((n) => {
      setNotifs([...n]);
    });
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("msgR", function (msg) {
        setMessages((state) => [...state, msg]);
      });
      socket.on("friendReqReceived", function (notification) {
        setNotifs((state) => [...state, notification]);
      });
      socket.on("doneFr", (msg) => {
        displaySuccess(msg);
      });
    }
  }, [socket]);
  return (
    <>
      <SocketContextProvider socket={socket}>
        <MsgContextProvider messages={{ messages, setMsg: setMessages }}>
          <NotifContextProvider notifs={{notifications: notifs,setNotifications:  setNotifs}}>
            <AppRouter />
          </NotifContextProvider>
        </MsgContextProvider>
      </SocketContextProvider>

      <ToastContainer />
    </>
  );
}

export default App;
