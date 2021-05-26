import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sent: {
    left: "10%",
    width: "88%",
    borderRadius: "10px",
    backgroundColor: "#7272f4",
    margin: "5px",
  },
  received: {
    backgroundColor: "#a2a2d9",
    borderRadius: "10px",
    margin: "5x",
  },
}));

export default function MessageView({ message, user }) {
  const classes = useStyles();

  return (
    <ListItem
      className={message.from._id === user._id ? classes.sent : classes.received}
    >
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${message.from.username}, Jan 9, 2014`}
        secondary={message.text}
      />
    </ListItem>
  );
}
