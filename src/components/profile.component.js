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
import { Divider, Tooltip } from "@material-ui/core";

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

export default function Profile() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      {/* <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Aman Mool"
        subheader="amanmool2000"
      /> */}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            A
          </Avatar>
        }
        title="Aman Mool"
        subheader="offline"
      />
      <CardMedia
        className={classes.media}
        image="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
        title="Profile Picture"
      />
      <CardActions disableSpacing>
        <Tooltip title="Send Friend Request">
          <IconButton aria-label="Send Friend Request">
            <GroupAddIcon />
          </IconButton>
        </Tooltip>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Aman Mool </Typography>
          <Divider />
          <Typography paragraph>amanmool2011@gmail.com</Typography>
          <Typography paragraph>amanmool5112</Typography>
          <Typography paragraph>Bhaktapur</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
