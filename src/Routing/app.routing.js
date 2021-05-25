import React from "react";

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

function AuthRoute({ component: Component, isAdmin, ...rest }) {
  const user = useSelector((state) => state.user.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {(localStorage.getItem("i_hash") || user) ? (
              <>
                <Navbar />
                <Component {...props} />
              </>
            ) : (
              <Redirect to="/login" />
            )}
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
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute path="/message" component={NewMessage} />
        <AuthRoute path="/notifications" component={NewNotifs} />
      </Switch>
    </Router>
  );
}
export default AppRouter;
