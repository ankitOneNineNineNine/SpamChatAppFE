import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Portal from "@material-ui/core/Portal";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    zIndex: 99,
    marginTop: "20px",
    width: "400px",
    margin: "auto",
    position: "fixed",
    right: '0px',
    borderRadius: '2px',
    border: '1px solid blue',
    top: "45px",
    backgroundColor: "white",
    [theme.breakpoints.down("850")]: {
      left: '50%',
      transform: 'translateX(-50%)'
    },
  },
  msgLst: {
    maxHeight: "600px",
    overflowY: "scroll",
    backgroundColor: "white",
  },
}));

export default function NewMessage() {
  const classes = useStyles();

  return (
    <div className={classes.dropdown}>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        New Messages
      </Typography>
      <Divider />
      <List className={classes.msgLst}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Photos, Jan 9, 2014"
            secondary="Hello Guyz kasto cha ta?"
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Photos, Jan 9, 2014"
            secondary="Hello Guyz kasto cha ta?"
          />
        </ListItem>
      </List>
    </div>
  );
}
