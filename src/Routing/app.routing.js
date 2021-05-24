import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import ShowProfile from "../pages/profile";
import Register from "../pages/register";

function AppRouter({children}) {
  return (
    <Router>
      {children}
      {!localStorage.getItem("i_hash") ? <Redirect to="/login" /> : null}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={ShowProfile} />
      </Switch>
    </Router>
  );
}
export default AppRouter;
