import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NewMessage from "../pages/message";
import NewNotifs from "../pages/notifications";
import Home from "../pages/Home";
import Login from "../pages/login";
// import NewMessage from "../pages/snewMessage";
import Register from "../pages/register";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar.component";
import People from "../pages/people";

function AuthRoute({ component: Component, isAdmin, ...rest }) {
  const user = useSelector((state) => state.user.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Navbar />
            <Component {...props} />
          </>
        );
      }}
    />
  );
}

function AppRouter() {
  const user = useSelector((state) => state.user.user);
  return (
    <Router>

      {!localStorage.getItem("i_hash") && !user && <Redirect to="/login" />}

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute path="/message" component={NewMessage} />
        <AuthRoute path="/notifications" component={NewNotifs} />
        <AuthRoute path="/people" component={People} />
      </Switch>
    </Router>
  );
}
export default AppRouter;
