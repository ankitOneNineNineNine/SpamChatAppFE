import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import {
  Chip,
  IconButton,
  List,
  ListItem,
  Modal,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { AddCircleOutlineSharp, GroupAdd } from "@material-ui/icons";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PublishIcon from "@material-ui/icons/Publish";
import TinyProfile from "./tinyProfile.component";
import { useSelector } from "react-redux";

import AddGroupMembers from "./addGroupMembers.component";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    position: "absolute",
    bottom: "10%",
    zIndex: 999,
    right: 0,
    maxWidth: 345,
  },
  addPeopleBox: {
    margin: theme.spacing(1),
  },
  uploadGrpImage: {
    position: "absolute",
    left: "0",
    top: 0,
    background: "white",
    fontSize: "50px",
  },
  media: {
    height: 140,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  grpForm: {
    background: "white",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "360px",
    textAlign: "center",
    margin: "auto",
  },
  hideInput: {
    display: "none",
  },
}));

export default function CreateGroupCard({
  admins,
  me,
  groupImage,
  setAddUserBox,
  setCreateGroup,
  changeImage,
  userAdded,
  groupName,
  setGroupName,
  create,
  edit = false,
  editGr,
}) {
  const classes = useStyles();
  const inputRef = useRef(null);
  return (
    <Card className={classes.root}>
      <input
        type="file"
        className={classes.hideInput}
        ref={inputRef}
        onChange={changeImage}
      />
      <CardMedia
        className={classes.media}
        image={
          typeof groupImage === "string"
            ? `http://localhost:8000/profileImge/${groupImage}`
            : groupImage
            ? URL.createObjectURL(groupImage)
            : `${process.env.PUBLIC_URL}/groupImg.png`
        }
        title=""
      />
      <CardContent>
        <Tooltip title="Upload Group Image">
          <PublishIcon
            className={classes.uploadGrpImage}
            onClick={() => {
              inputRef.current.click();
            }}
          />
        </Tooltip>
        <TextField
          required
          label="Group Name"
          disabled={edit && admins && !admins.includes(me._id)}
          defaultValue={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
      </CardContent>

      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            setAddUserBox(true);
          }}
        >
          {edit ? (
            admins && admins.includes(me._id) && <AddCircleOutlineIcon />
          ) : (
            <AddCircleOutlineIcon />
          )}
          Members
        </Button>
        <Typography>{userAdded.length} members</Typography>
      </CardActions>
      <CardActions>
        <Button
          size="small"
          color="primary"
          style={{ margin: "auto" }}
          onClick={edit ? editGr : create}
        >
          {edit ? "Edit " : "Create"}
        </Button>
        <Button
          size="small"
          color="primary"
          style={{ margin: "auto" }}
          onClick={() => {
            setCreateGroup(false);
          }}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
