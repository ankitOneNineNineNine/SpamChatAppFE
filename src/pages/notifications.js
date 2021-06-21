import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NotifContext } from "../contexts/notification.context";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { SocketContext } from "../contexts/socket.context";
import { useSelector } from "react-redux";
import { REMOVE } from "../adapters/http.adapter";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    zIndex: 99,
    marginTop: "20px",
    width: "400px",
    margin: "auto",
    position: "fixed",
    right: "0px",
    borderRadius: "2px",
    border: "1px solid blue",
    top: "45px",
    backgroundColor: "white",
    [theme.breakpoints.down("850")]: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  root: {
    minWidth: 275,
    cursor: "pointer",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  user: { float: "left", width: "400px" },
  buttons: { float: "right" },
}));

export default function NewNotifs() {
  const classes = useStyles();
  let { notifications, setNotifications } = useContext(NotifContext);
  const { socket } = useContext(SocketContext);
  const me = useSelector((state) => state.user.user);
  const acceptFr = (from, id) => {
    socket.emit("acceptOrReject", {
      reply: "accept",
      from,
      to: me._id,
      id,
    });
    let ntfs = notifications.filter((n) => n.from !== from);
    setNotifications(ntfs);
  };
  const rejectFr = (from, id) => {
    socket.emit("acceptOrReject", {
      reply: "reject",
      from,
      to: me._id,
      id,
    });
    let ntfs = notifications.filter((n) => n.from !== from);
    setNotifications(ntfs);
  };

  if (!notifications.length) {
    return (
      <div className={classes.dropdown}>
        <Card className={classes.root} variant="outlined">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            No New Notifications
          </Typography>
        </Card>
      </div>
    );
  }

  return (
    <div className={classes.dropdown}>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        New Notifications
      </Typography>
      {notifications
        .filter((n) => {
          return (
            (n.to?._id == me._id && !n.accepted) ||
            (n.from?._id == me._id && n.accepted)
          );
        })
        .map((notif, i) => {
          return notif.to._id == me._id ? (
            <Card className={classes.root} key={i} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Friend Request
                </Typography>
                <ListItem className={classes.user}>
                  <ListItemAvatar>
                    <Avatar>A</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={notif.from.fullname} />
                </ListItem>
              </CardContent>
              <CardActions className={classes.buttons}>
                <Button
                  size="medium"
                  onClick={() => {
                    acceptFr(notif.from._id, notif._id);
                  }}
                >
                  Accept
                </Button>
                <Button
                  size="medium"
                  onClick={() => {
                    rejectFr(notif.from._id, notif._id);
                  }}
                >
                  Reject
                </Button>
              </CardActions>
            </Card>
          ) : (
            <Card
              className={classes.root}
              key={i}
              variant="outlined"
              onClick={() => {
                REMOVE(`/notifs/${notif._id}`, true);
        
                setNotifications(
                  notifications.filter((not) => not._id !== notif._id)
                );
              }}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Friend Request Accepted
                </Typography>
                <ListItem className={classes.user}>
                  <ListItemAvatar>
                    <Avatar>A</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={notif.to.fullname} />
                </ListItem>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}
