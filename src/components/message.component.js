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
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { BEURL } from "../config";

const useStyles = makeStyles((theme) => ({
  sent: {
    left: "10%",
    width: "88%",
    borderRadius: "10px",
    backgroundColor: "#7272f4",
    margin: "5px",
    display: "block",
    cursor: "pointer",
  },
  received: {
    cursor: "pointer",
    backgroundColor: "#a2a2d9",
    borderRadius: "10px",
    margin: "5x",
    display: "block",
  },
  gridListContainer: {
    flexDirection: "row",
    height: "300px",
    padding: 0,
    overflow: "hidden",
    height: "auto",
  },
  gridList: {
    padding: 0,
    position: "relative",
    top: "40px",
    width: "200px",
    height: "200px",
  },
  imageMessage: {
    width: "200px",
    height: "200px",
    float: "revert",
    cursor: "pointer",
    clear: "both",
  },
  headingFlex: { display: "flex", padding: "5px", alignItems: "center" },
}));

export default function MessageView({ message, user, msgNots = false }) {
  const classes = useStyles();

  return (
    <div>
      <ListItem
        className={
          message.from._id === user._id ? classes.sent : classes.received
        }
      >
        <div className={classes.headingFlex}>
          <ListItemAvatar>
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={message.from.image && `${message.from.image}`}
            >
              {message.from.image ? null : message.from?.fullname.charAt(0)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${
              message.from.fullname ? message.from.fullname : message.from.name
            }, ${moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`}
            secondary={
              (msgNots ? (message?.images?.length ? "FILE MESSAGE" : "") : "") +
              message.text
            }
          />
        </div>
        {!msgNots ? (
          message.images?.length ? (
            <div>
              <GridList
                cellHeight={150}
                cols={2}
                className={classes.gridListContainer}
              >
                {message.images.map((image, i) => (
                  <div key={i}>
                    <GridListTile className={classes.gridList}>
                      <img
                        className={classes.imageMessage}
                        src={image}
                        loading="lazy"
                      />
                    </GridListTile>
                  </div>
                ))}
              </GridList>
            </div>
          ) : null
        ) : null}
      </ListItem>
    </div>
  );
}
