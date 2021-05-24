import React from "react";
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
import { CircularProgress, Divider, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";

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

export default function Profile({ user }) {
  const classes = useStyles();
  const me = useSelector((state) => state.user);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (!me.user || me.isLoading) {
    return <CircularProgress />;
  }
  return (
    <Card
      className={classes.root}
      style={
        user.username === me.user.username
          ? {
              display: "block",
              margin: "auto",
            }
          : null
      }
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            A
          </Avatar>
        }
        title={user.fullname}
        subheader={user.status}
      />
      <CardMedia
        className={classes.media}
        image="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
        title="Profile Picture"
      />
      <CardActions disableSpacing>
        {user.username === me.user.username ? (
          <Tooltip title="Edit">
            <IconButton aria-label="Edit">
              <EditIcon />
              <Typography variant="caption" style = {{fontWeight: 'bolder'}}>Edit</Typography>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Send Friend Request">
            <IconButton aria-label="Send Friend Request">
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
          {user.username !== me.user.username && <ExpandMoreIcon />}
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
      ) : (
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
  );
}
