import React, { useEffect } from "react";
import AppRouter from "./Routing/app.routing";
import "./styles/scrollBar.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "./common/actions";
import Navbar from "./components/Navbar.component";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('hi')
    let hash = localStorage.getItem("i_hash");
    console.log('hash', hash)
    if (hash) {
      dispatch(setUser({ token: hash }));
    }
  }, []);
  return (
    <>
      <AppRouter>
        <Navbar />
      </AppRouter>
      <ToastContainer />
    </>
  );
}

export default App;
