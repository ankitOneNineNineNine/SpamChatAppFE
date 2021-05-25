import React, { useEffect } from "react";
import AppRouter from "./Routing/app.routing";
import "./styles/scrollBar.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "./common/actions";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let hash = localStorage.getItem("i_hash");
    if (hash) {
      dispatch(setUser({ token: hash }));
    }
  }, []);
  return (
    <>
      <AppRouter />

      <ToastContainer />
    </>
  );
}

export default App;
