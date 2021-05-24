import React from "react";
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

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    height: "80vh",
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

export default function FriendsList({ toggleDrawer }) {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: "right",
      })}
      role="presentation"
      onClick={() => toggleDrawer("right", false)}
      onKeyDown={() => toggleDrawer("right", false)}
    >
      <Typography variant="h5" className={classes.headingFriends}>
        Friends
      </Typography>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts", "Others"].map(
          (text, index) => (
            <ListItem key = {index}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Ankit Pradhan" secondary="Online" />
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key = {index}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Aman Mool" secondary="Offline" />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
