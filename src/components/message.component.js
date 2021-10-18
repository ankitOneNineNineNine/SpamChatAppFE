import React, { useState } from "react";
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
  Box,
  Button,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  ListItemIcon,
  Modal,
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
    display: 'flex',
    justifyContent: 'center',
    flex: '0 0 30%',
    flexWrap: 'wrap',
  },

  imageMessage: {
    width: "150px",
    height: "150px",
    position: "relative",
    float: "revert",
    cursor: "pointer",
    clear: "both",
  },
  headingFlex: { display: "flex", padding: "5px", alignItems: "center" },
  imageContainer: {
    overflow: "hidden",

  },
  modalImageContainer: {
    width: '80%',
    margin: 'auto',

    overflow: 'hidden',
  },
  modalImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    maxHeight: '100%'

  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
}));

export default function MessageView({ message, user, msgNots = false }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mdlImg, setMdlImg] = useState(null)
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
            primary={`${message.from.fullname ? message.from.fullname : message.from.name
              }, ${moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`}
            secondary={
              (msgNots ? (message?.images?.length ? "FILE MESSAGE" : "") : "") +
              message.text
            }
          />
        </div>

        {!msgNots ? (
          message.images?.length ? (
            <div className={classes.gridListContainer}>

              {message.images.map((image, i) => (
                <div key={i} className={classes.imageContainer}>

                  <img
                    className={classes.imageMessage}
                    src={image}
                    loading="lazy"
                    onClick={() => { setOpen(true); setMdlImg(image) }}
                  />
                </div>
              ))}

              <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className={classes.modalImageContainer}>
                  <img
                    className={classes.modalImage}
                    src={mdlImg}
                    loading="lazy"
                  />
                </div>

              </Modal>

            </div>
          ) : null
        ) : null}
      </ListItem>
    </div>
  );
}
