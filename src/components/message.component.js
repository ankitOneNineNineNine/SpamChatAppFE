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

const useStyles = makeStyles((theme) => ({
  sent: {
    left: "10%",
    width: "88%",
    borderRadius: "10px",
    backgroundColor: "#7272f4",
    margin: "5px",
    display: "block",
  },
  received: {
    backgroundColor: "#a2a2d9",
    borderRadius: "10px",
    margin: "5x",
    display: "block",
  },
  gridListContainer: {
    flexDirection: "row",
    padding: 0,
    overflow: "hidden",
  },
  gridList: {
    padding: 0,
    position: "relative",
    top: "40px",
    width: "300px",
    height: "300px",
  },
  imageMessage: {
    width: "auto",
    height: "100%",
    float: "revert",
    cursor: "pointer",
    clear: "both",
  },
  headingFlex: { display: "flex", padding: "5px", alignItems: "center" },
}));

export default function MessageView({ message, user }) {
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
              src={
                message.from.image &&
                `http://localhost:8000/profileImge/${message.from.image}`
              }
            >
              {message.from.image ? null : message.from?.fullname.charAt(0)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${
              message.from.fullname ? message.from.fullname : message.from.name
            }, ${moment(message.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}`}
            secondary={message.text}
          />
        </div>
        <div>
          <GridList
            cellHeight={150}
            cols={2}
            className={classes.gridListContainer}
          >
            {message?.images?.map((image, i) => (
              <div key={i}>
                <GridListTile className={classes.gridList}>
                  <img
                    className={classes.imageMessage}
                    srcSet={"http://localhost:8000/msgImgs" + "/" + image}
                    alt={image}
                    loading="lazy"
                  />
                </GridListTile>
              </div>
            ))}
          </GridList>
        </div>
      </ListItem>
    </div>
  );
}
