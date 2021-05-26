import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useformStyles from "../styles/form.useStyle";
import { NavLink, withRouter } from "react-router-dom";
import { GET, POST } from "../adapters/http.adapter";
import { displayError, displayInfo, displaySuccess } from "../common/toaster";

function Register({ history }) {
  const classes = useformStyles();

  const [usedCreds, setUsedCreds] = useState([]);
  const [credentials, setCredentials] = useState({});
  const [formError, setFormError] = useState({});

  useEffect(() => {
    GET("/auth/")
      .then((usedC) => {
        setUsedCreds(usedC);
      })
      .catch((err) => {
        err &&
          err.response &&
          err.response.data &&
          err.response.data.message &&
          displayError(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    validate();
  }, [credentials]);

  const registerChange = (e) => {
    let { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const validate = () => {
    if (!credentials.fullname) {
      setFormError((prev) => ({
        ...prev,
        fullname: "Please Fill Fullname",
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        fullname: null,
      }));
    }
    if (!credentials.email) {
      setFormError((prev) => ({
        ...prev,
        email: "Please Fill Email Address",
      }));
    } else {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          credentials.email
        )
      ) {
        if (usedCreds.findIndex((d) => d.email === credentials.email) > -1) {
          setFormError((prev) => ({
            ...prev,
            email: "Email already in use",
          }));
        } else {
          setFormError((prev) => ({
            ...prev,
            email: null,
          }));
        }
      } else {
        setFormError((prev) => ({
          ...prev,
          email: "Please Enter Valid Email Address",
        }));
      }
    }
    if (!credentials.username) {
      setFormError((prev) => ({
        ...prev,
        username: "Please Fill Username",
      }));
    } else {
      if (
        usedCreds.findIndex((d) => d.username === credentials.username) > -1
      ) {
        setFormError({
          ...formError,
          username: "Username is already taken",
        });
      } else {
        setFormError((prev) => ({
          ...prev,
          username: null,
        }));
      }
    }
    if (!credentials.password) {
      setFormError((prev) => ({
        ...prev,
        password: "Please Fill Password",
      }));
    } else {
      if (credentials.password.length < 8) {
        setFormError((prev) => ({
          ...prev,
          password: "Password Length should be atleast 8",
        }));
      } else {
        setFormError((prev) => ({
          ...prev,
          password: null,
        }));
      }
    }
  };
  const onRegister = async (e) => {
    e.preventDefault();
    let error = false;

    let errKeys = Object.keys(formError);
    for (let i = 0; i < errKeys.length; i++) {
      let key = errKeys[i];
      if (formError[key]) {
        error = true;
        break;
      }
    }
    if (!error) {
      try {
        let response = await POST("/auth/register", credentials);
        displaySuccess("Successfully Registered!");
        history.push("/login");
        displayInfo("Please Login!");
      } catch (err) {
        displayError(err.response.data.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Fullname"
            name="fullname"
            autoFocus
            onChange={registerChange}
          />
          <Typography
            component="h5"
            variant="caption"
            className={classes.error}
          >
            {formError?.fullname}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={registerChange}
          />
          <Typography
            component="h5"
            variant="caption"
            className={classes.error}
          >
            {formError?.email}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={registerChange}
          />
          <Typography
            component="h5"
            variant="caption"
            className={classes.error}
          >
            {formError?.username}
          </Typography>
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            autoFocus
            onChange={registerChange}
          />
          <Typography
            component="h5"
            variant="caption"
            className={classes.error}
          >
            {formError?.address}
          </Typography> */}
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
            onChange={registerChange}
          />
          <Typography
            component="h5"
            variant="caption"
            className={classes.error}
          >
            {formError?.password}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onRegister}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/login">{"Already have an account? Login"}</NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Register;
