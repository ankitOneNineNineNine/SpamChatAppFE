import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockoutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useformStyles from "../styles/form.useStyle";
import { NavLink } from "react-router-dom";
import { POST } from "../adapters/http.adapter";
import { displayError } from "../common/toaster";
import {useSelector, useDispatch} from 'react-redux'
import { setUser } from "../common/actions";

function Login({ history }) {
  const classes = useformStyles();
  const userState = useSelector(setUser)
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({});
  const loginChange = (e) => {
    let { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(setUser(credentials))
    history.push("/");
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockoutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={loginChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={loginChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onLogin}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="/forgot-password">Forgot password?</NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/register">
                {"Don't have an account? Register"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default Login;
