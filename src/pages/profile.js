import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../components/profile.component";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  myProfile: {
    display: 'block',
    margin: 'auto'
  }
}));

export default function ShowProfile() {
  const classes = useStyles();
const user = useSelector(state=>state.user.user)
  return (
    <div className = {classes.myProfile}>
      <Profile user = {user}/>
    </div>
  );
}
