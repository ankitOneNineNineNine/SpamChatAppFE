import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MessageView from "../components/message.component";
import MessageDividers from "../components/messageDivider.component";
import { Divider, List, Typography, useMediaQuery } from "@material-ui/core";

import Profile from "../components/profile.component";
import AppBar from "../components/Drawer.component";
import FriendsList from "../components/friendsList.component";

const useStyles = makeStyles((theme) => ({
  messageList: {
    height: "70vh",
    overflowY: "scroll",
    overflowX: "hidden",
    scrollbarWidth: "none",
    backgroundColor: theme.palette.background.paper,
    padding: "5px",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  friendsList: {
    [theme.breakpoints.down("850")]: {
      display: "none",
    },
  },
  info: {
    marginTop: "10px",
    height: "80vh",
    overflowY: "scroll",
    [theme.breakpoints.down("650")]: {
      display: "none",
    },
  },
  fname: {
    textAlign: "center",
    fontWeight: "bolder",
  },
}));

function Home() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:650px)");
  return (
    <div className={classes.root}>
      <AppBar />
      <Grid container spacing={3}>
        <Grid item xs className={classes.info}>
          <Profile />
          <MessageDividers />
        </Grid>
        <Grid item xs={matches ? 6 : 12}>
          <Typography variant="h6" className={classes.fname}>
            Aman Mool
          </Typography>
          <Divider />
          <List className={classes.messageList}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, i) => {
              return <MessageView sent={item % 2 == 0 ? true : false} />;
            })}
          </List>
        </Grid>
        <Grid item xs className={classes.friendsList}>
          <FriendsList />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
