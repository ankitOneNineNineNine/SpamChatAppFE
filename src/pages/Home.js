import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MessageView from "../components/message.component";
import MessageDividers from "../components/messageDivider.component";
import { Divider, List, Typography, useMediaQuery } from "@material-ui/core";

import Profile from "../components/profile.component";
import AppBar from "../components/Drawer.component";
import FriendsList from "../components/friendsList.component";
import InputMessage from "../components/inputMessage.component";
import LDrawer from "../components/Drawer.component";

const useStyles = makeStyles((theme) => ({
  messageList: {
    height: "71vh",
    overflowY: "scroll",
    overflowX: "hidden",
    scrollbarWidth: "none",
    backgroundColor: theme.palette.background.paper,
    padding: "5px",
    [theme.breakpoints.down("850")]: {
      height: "63vh",
    },
    [theme.breakpoints.down("650")]: {
      height: "65vh",
    },
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
    height: "90vh",
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
  const msgRef = useRef(null);

  useEffect(() => {
    let ht = msgRef.current.scrollHeight;
    msgRef.current.scrollTo({ top: ht });
  }, [msgRef]);

  const [textMsg, setTextMsg] = useState("");
  const [images, setImages] = useState([]);

  const messageChange = (text) => {
    setTextMsg(text);
  };
  const removeImage = (i) => {
    let imgs = [...images];
    imgs.splice(i, 1);

    setImages(imgs);
  };
  const messageSend = () => {
    console.log("textMessage=>", textMsg, "images=>", images);

  };
  const imageSelect = (e) => {
    setImages([...images, ...e.target.files]);
  };

  return (
    <div className={classes.root}>
      <LDrawer />
      <Grid container spacing={3}>
        <Grid item xs className={classes.info}>
          <Profile
            user={{
              fullname: "Aman Mool",
              status: "online",
              email: "AmanMool@gmail.com",
              address: "Bhaktapur, Radhe-Radhe",
              username: "AmanMool",
            }}
          />
          <MessageDividers />
        </Grid>
        <Grid item xs={matches ? 6 : 12}>
          <Typography variant="h6" className={classes.fname}>
            Aman Mool
          </Typography>
          <Divider />
          <List className={classes.messageList} ref={msgRef}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, i) => {
              return (
                <MessageView key={item} sent={item % 2 == 0 ? true : false} />
              );
            })}
          </List>
          <InputMessage
            messageSend={messageSend}
            messageChange={messageChange}
            imageSelect={imageSelect}
            removeImage={removeImage}
            images={images}
          />
        </Grid>
        <Grid item xs className={classes.friendsList}>
          <FriendsList />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
