import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import Register from "../pages/register";

function AppRouter() {
  return (
    <Router>
      {!localStorage.getItem("i_hash") ? <Redirect to="/login" /> : null}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}
export default AppRouter;
