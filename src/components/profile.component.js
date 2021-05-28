import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button, CircularProgress, Divider, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
import { SocketContext } from "../contexts/socket.context";
import CheckIcon from "@material-ui/icons/Check";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import EditProfile from "./edit-profile.component";
import GroupIcon from "@material-ui/icons/Group";
import AddGroupMembers from "./addGroupMembers.component";
import CreateGroup from "./createGroup.component";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "70.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Profile({ user, sentNotifs = () => false }) {
  const classes = useStyles();
  const me = useSelector((state) => state.user);
  const [expanded, setExpanded] = React.useState(false);
  const { socket } = useContext(SocketContext);
  const [sent, setSent] = useState(false);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useState(() => {
    if (sentNotifs(user)) {
      setSent(true);
    }
  }, [me]);
  if (!me.user || me.isLoading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <CircularProgress />;
  }

  const sendFrReq = (e) => {
    setSent(true);
    socket.emit("friendReqSend", {
      from: me.user._id,
      to: user._id,
    });
  };
  return edit ? (
    <EditProfile setEdit={setEdit} />
  ) : (
    <div>
      {info ? (
        <CreateGroup
          createGroup={info}
          setCreateGroup={setInfo}
          position="left"
          group={user}
          
        />
      ) : null}
      <Card
        className={classes.root}
        style={
          user.username === me.user.username
            ? {
                display: "block",
                margin: "auto",
                marginTop: "60px",
              }
            : null
        }
      >
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={
                user.image && `http://localhost:8000/profileImge/${user.image}`
              }
            >
              {user.image ? null : user.fullname.charAt(0)}
            </Avatar>
          }
          title={user.fullname ? user.fullname : user.name}
          subheader={user.status}
        />

        <CardMedia
          className={classes.media}
          image={
            user.image
              ? `http://localhost:8000/profileImge/${user.image}`
              : `${process.env.PUBLIC_URL}/userimage.jpg`
          }
          title="Profile Picture"
        />
        <CardActions disableSpacing>
          {user.username === me.user.username ? (
            <Tooltip
              title="Edit"
              onClick={() => {
                setEdit(true);
              }}
            >
              <IconButton aria-label="Edit">
                <EditIcon />
                <Typography variant="caption" style={{ fontWeight: "bolder" }}>
                  Edit
                </Typography>
              </IconButton>
            </Tooltip>
          ) : me.user.friends.findIndex((p) => p._id === user._id) >= 0 ? (
            <Tooltip title="Already Friends">
              <IconButton aria-label="Friend">
                <EmojiPeopleIcon />
              </IconButton>
            </Tooltip>
          ) : sent ? (
            <Tooltip title="Sent Request">
              <IconButton aria-label="Sent">
                <CheckIcon />
              </IconButton>
            </Tooltip>
          ) : user.name ? (
            <Tooltip title="Info">
              <IconButton
                aria-label="Info"
                onClick={() => {
                  setInfo(true);
                }}
              >
                <GroupIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Send Friend Request">
              <IconButton aria-label="Send Friend Request" onClick={sendFrReq}>
                <GroupAddIcon />
              </IconButton>
            </Tooltip>
          )}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {user.username === me.user.username ? null : user.name ? null : (
              <ExpandMoreIcon />
            )}
          </IconButton>
        </CardActions>
        {user.username === me.user.username ? (
          <CardContent>
            <Typography variant="h6">{user.fullname}</Typography>
            <Divider />
            <Typography paragraph>{user.email}</Typography>
            <Typography paragraph>{user.username}</Typography>
            <Typography paragraph>{user.address}</Typography>
          </CardContent>
        ) : user.name ? null : (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6">{user.fullname}</Typography>
              <Divider />
              <Typography paragraph>{user.email}</Typography>
              <Typography paragraph>{user.username}</Typography>
              <Typography paragraph>{user.address}</Typography>
            </CardContent>
          </Collapse>
        )}
      </Card>
    </div>
  );
}

export default Profile;
