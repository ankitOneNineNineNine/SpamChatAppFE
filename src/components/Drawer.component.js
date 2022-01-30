import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import FriendsList from "./friendsList.component";
import Profile from "./profile.component";
import MessageDividers from "./messageDivider.component";
import { Avatar, Chip, Typography } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import GroupIcon from "@material-ui/icons/Group";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  infoDrawerChip: {
    display: "none",
    margin: "5px",
    fontWeight: "bolder",
    lineHeight: "30px",
    [theme.breakpoints.down("650")]: {
      display: "block",
      float: "left",
    },
  },
  friendsDrawerChip: {
    display: "none",
    fontWeight: "bolder",
    lineHeight: "30px",
    margin: "5px",
    [theme.breakpoints.down("850")]: {
      display: "block",
      float: "right",
    },
  },
  drawerInfo: {
    fontWeight: "bolder",
    textAlign: "center",
  },
}));

export default function LDrawer({ user, spmDivider }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });
  const currentMsging = useSelector((state) => state.currentMsging.info);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

 

  return (
    <div>
      {["info", "friends"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Chip
            icon={
              anchor === "friends" ? (
                <GroupIcon style={{ verticalAlign: "middle" }} />
              ) : (
                <FaceIcon style={{ verticalAlign: "middle" }} />
              )
            }
            className={
              anchor === "friends"
                ? classes.friendsDrawerChip
                : classes.infoDrawerChip
            }
            onClick={toggleDrawer(anchor == "friends" ? "right" : "left", true)}
            label={anchor}
            clickable
            color="primary"
            variant="outlined"
          />
          <Drawer
            anchor={anchor == "friends" ? "right" : "left"}
            open={state[anchor == "friends" ? "right" : "left"]}
            onClose={toggleDrawer(
              anchor == "friends" ? "right" : "left",
              false
            )}
          >
            {anchor === "friends" ? (
              <FriendsList
                toggleDrawer={toggleDrawer}
                friends={user ? user.friends : []}
                groups={user ? user.groups : []}
              />
            ) : (
              <div style={{ width: "250px" }}>
                <Profile user={currentMsging} />
                <MessageDividers spmDivider = {spmDivider}/>
              </div>
            )}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
