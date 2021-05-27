import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { IconButton, Modal, TextField, Tooltip } from "@material-ui/core";
import { GroupAdd } from "@material-ui/icons";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PublishIcon from "@material-ui/icons/Publish";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    position: "absolute",
    bottom: 0,
    right: 0,
    maxWidth: 345,
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
        <Modal
          open={createGroup}
          onClose={() => {
            setCreateGroup(false);
          }}
        >
          <div className={classes.grpForm}>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={`${process.env.PUBLIC_URL}/groupImg.png`}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Tooltip title="Upload Group Image">
                  <PublishIcon className={classes.uploadGrpImage} />
                </Tooltip>
                <TextField label="Group Name" />
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setAddUserBox(true);
                  }}
                >
                  <AddCircleOutlineIcon />
                  Add People
                </Button>
                <Typography>{userAdded.length} members</Typography>
              </CardActions>
              <CardActions>
                <Button size="small" color="primary" style={{ margin: "auto" }}>
                  Create
                </Button>
              </CardActions>
            </Card>
          </div>
        </Modal>
      )}
    </div>
  );
}
