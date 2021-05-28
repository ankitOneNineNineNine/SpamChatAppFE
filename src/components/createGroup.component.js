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
import { useDispatch, useSelector } from "react-redux";

import AddGroupMembers from "./addGroupMembers.component";
import CreateGroupCard from "./createGroupCard.component";
import { displayError } from "../common/toaster";
import { POST } from "../adapters/http.adapter";
import { setUser } from "../common/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    position: "absolute",
    bottom: "15%",
    zIndex: 999,
    right: 0,
    maxWidth: 345,
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
}));

export default function CreateGroup() {
  const classes = useStyles();
  const [createGroup, setCreateGroup] = useState(false);
  const [addUserBox, setAddUserBox] = useState(false);
  const [userAdded, setUserAdded] = useState([]);
  const [groupImage, setGroupImage] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [groupName, setGroupName] = useState("");
  const me = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const changeImage = (e) => {
    setGroupImage(e.target.files[0]);
  };

  const searchFriendsChange = (e) => {
    setSearchText(e.target.value);
  };

  const create = (e) => {
    e.preventDefault();
    if (!groupName.length) {
      displayError("Group Name is required");
      return;
    }

    let members = userAdded.map((u) => u._id);

    let formData = new FormData();
    console.log(members);
    members.forEach((member) => {
      formData.append("members", member);
    });
    if (groupImage) formData.append("image", groupImage);
    formData.append("name", groupName);
    POST("/group", formData, true, "multipart/form-data")
      .then((data) => {
        dispatch(setUser({ token: localStorage.getItem("i_hash") }));
      })
      .catch((err) => {
        displayError(err.response.data.message);
      });
  };
  const myFriends = me.friends.filter(
    (friend) =>
      friend.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className={classes.root}>
      <Tooltip title="Create A Group">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            setCreateGroup(true);
          }}
        >
          <GroupAddIcon />
        </Fab>
      </Tooltip>

      {createGroup && (
        <div className={classes.grpForm}>
          <CreateGroupCard
            groupImage={groupImage}
            setAddUserBox={setAddUserBox}
            setCreateGroup={setCreateGroup}
            changeImage={changeImage}
            userAdded={userAdded}
            setGroupName={setGroupName}
            create={create}
          />
        </div>
      )}
      {addUserBox ? (
        <AddGroupMembers
          addUserBox={addUserBox}
          setAddUserBox={setAddUserBox}
          myFriends={myFriends}
          setUserAdded={setUserAdded}
          userAdded={userAdded}
          searchFriendsChange={searchFriendsChange}
        />
      ) : null}
    </div>
  );
}
