import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import MailIcon from "@material-ui/icons/Mail";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setCurrentMessaging } from "../common/actions";
import TinyProfile from "./tinyProfile.component";
import { MsgContext } from "../contexts/message.context";
import { PUT } from "../adapters/http.adapter";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    height: "90vh",
    overflowY: "scroll",
    minHeight: "500px",
    [theme.breakpoints.down("850")]: {
      height: "100vh",
    },
  },
  fullList: {
    width: "100%",
    [theme.breakpoints.down("850")]: {
      width: "250px",
    },
  },
  headingFriends: {
    fontWeight: "bolder",
    textAlign: "center",
    padding: "10px",
  },
}));

export default function FriendsList({ friends, groups, toggleDrawer }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: "right",
      })}
      role="presentation"
      onClick={() => toggleDrawer && toggleDrawer("right", false)}
      onKeyDown={() => toggleDrawer && toggleDrawer("right", false)}
    >
      <Typography variant="h5" className={classes.headingFriends}>
        Friends & Groups
      </Typography>
      <Divider />
      <List>
        {friends.map((friend, index) => (
          <ListItem
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(setCurrentMessaging(friend));

              localStorage.setItem("currentMsging", JSON.stringify(friend));
              toggleDrawer && toggleDrawer("right", false);
            }}
          >
            <TinyProfile profile={friend} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List style={{ cursor: "pointer" }}>
        {groups.map((group, index) => (
          <ListItem
            key={index}
            onClick={() => {
              dispatch(setCurrentMessaging(group));

              localStorage.setItem("currentMsging", JSON.stringify(group));
              toggleDrawer && toggleDrawer("right", false);
            }}
          >
            <TinyProfile profile={group} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
