import React, { useContext, useRef, useState } from "react";
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
import { displayError, displaySuccess } from "../common/toaster";
import { POST, PUT } from "../adapters/http.adapter";
import { setUser } from "../common/actions";
import { SocketContext } from "../contexts/socket.context";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    position: "absolute",
    zIndex: 999,
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
  editCard: {
    position: "absolute",
    left: "60%",
    top: "500px",
    [theme.breakpoints.down("400")]: {
      left: "100%",
      top: "65%",
    },
  },
  createCard: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
}));

export default function CreateGroup({
  createGroup,
  setCreateGroup,
  edit = false,
  group = {},
}) {
  const classes = useStyles();
  const [addUserBox, setAddUserBox] = useState(false);
  const [userAdded, setUserAdded] = useState(group.members || []);
  const [groupImage, setGroupImage] = useState(group.image || null);
  const [searchText, setSearchText] = useState("");
  const [groupName, setGroupName] = useState(group.name || "");
  const {socket} = useContext(SocketContext)
  const me = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const editGr = (e) => {
    e.preventDefault();
    if (!groupName.length) {
      displayError("Group Name is required");
      return;
    }

    let members = userAdded.map((u) => u._id);

    let formData = new FormData();

    members.forEach((member) => {
      formData.append("members", member);
    });
    if (groupImage) formData.append("image", groupImage);
    formData.append("name", groupName);
    PUT(`/group/${group._id}`, formData, true, "multipart/form-data")
      .then((data) => {
        dispatch(setUser({ token: localStorage.getItem("i_hash") }));
      })
      .catch((err) => {
        displayError(err.response.data.message);
      });
  };

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

    members.forEach((member) => {
      formData.append("members", member);
    });
    if (groupImage) formData.append("image", groupImage);
    formData.append("name", groupName);

    POST("/group", formData, true, "multipart/form-data")
      .then((data) => {
        dispatch(setUser({ token: localStorage.getItem("i_hash") }));
        displaySuccess("Group Created");
        socket.emit('newGroup', {
          members,
        })
        setCreateGroup(false);
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
    <div className={classes.root + edit && classes.editCard}>
      {createGroup && (
        <div className={classes.grpForm}>
          <CreateGroupCard
            groupName={groupName}
            groupImage={groupImage}
            setAddUserBox={setAddUserBox}
            setCreateGroup={setCreateGroup}
            changeImage={changeImage}
            userAdded={userAdded}
            setGroupName={setGroupName}
            create={create}
            admins={group.admins}
            me={me}
            edit={edit}
            editGr={editGr}
          />
        </div>
      )}
      {addUserBox ? (
        <AddGroupMembers
          admins={group.admins}
          me={me}
          edit={edit}
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
