import React, { useContext, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { withRouter } from "react-router";
import { CardMedia, ClickAwayListener, Modal, Portal } from "@material-ui/core";
import Profile from "./profile.component";
import { useDispatch, useSelector } from "react-redux";
import FacebookIcon from "@material-ui/icons/Facebook";
import { NavLink } from "react-router-dom";
import NewMessage from "../pages/message";
import NewNotifs from "../pages/notifications";
import { POST } from "../adapters/http.adapter";
import { searchPeople } from "../common/actions";
import { SocketContext } from "../contexts/socket.context";
import { NotifContext } from "../contexts/notification.context";
import CancelIcon from "@material-ui/icons/Cancel";
import { MsgContext } from "../contexts/message.context";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  media: {
    width: "50px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  crossModal: {
    position: "absolute",
    top: "0",
    right: 0,
    color: "white",
    width: 60,
    height: 60,
  },
}));

function Navbar({ history }) {
  const user = useSelector((state) => state.user.user);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [peopleSrcText, setPeopleSrcText] = useState("");
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const { socket, setSocket } = useContext(SocketContext);
  const { notifications } = useContext(NotifContext);
  const { messages } = useContext(MsgContext);

  const dispatch = useDispatch();
  const search = (e) => {
    if (e.key === "Enter") {
      dispatch(searchPeople(peopleSrcText));
      history.push("/people");
    }
  };

  const logout = () => {
    localStorage.clear();
    socket.emit("logout", "logout");
    setSocket(null);
    history.push("/login");
  };
  const searchPeopleChange = (e) => {
    setPeopleSrcText(e.target.value);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = (_) => {
    setProfileModalOpen(false);
  };
  const handleProfileOpen = (_) => {
    setProfileModalOpen(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>
      <Modal open={profileModalOpen} onClose={handleProfileClose}>
        <div>
          <IconButton
            iconstyle={classes.crossModal}
            aria-label="Cross"
            className={classes.crossModal}
            onClick={handleProfileClose}
          >
            <CancelIcon style={{ fontSize: "40px" }} />
          </IconButton>
          <Profile user={user} />
        </div>
      </Modal>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          setMsgOpen(false);
          setNotifsOpen(false);
          history.push("/message");
        }}
      >
        <IconButton aria-label="show new mails" color="inherit">
          <Badge
            badgeContent={
              messages.filter((m) => !m.seen && m?.from?._id !== user?._id)
                .length
            }
            color="secondary"
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push("/notifications");
        }}
      >
        <IconButton aria-label="show new notifications" color="inherit">
          <Badge
            badgeContent={
              notifications.filter((n) => {
                return (
                  (n.to?._id == user._id && !n.accepted) ||
                  (n.from?._id == user._id && n.accepted)
                );
              }).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton
          aria-label="logout"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          setMsgOpen(false);
          setNotifsOpen(false);
        }}
      >
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setMsgOpen(false);
                  setNotifsOpen(false);
                  history.push("/");
                }}
              >
                <img
                  className={classes.media}
                  src={process.env.PUBLIC_URL + "/logo.png"}
                  title="Logo"
                />
              </IconButton>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search People & Groups"
                  onChange={searchPeopleChange}
                  onKeyPress={search}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-label="new mails"
                  color="inherit"
                  onClick={() => {
                    setMsgOpen(!msgOpen);
                    setNotifsOpen(false);
                  }}
                >
           
                  <Badge
                    badgeContent={
                      messages.filter(
                        (m) => !m.seen && m?.from?._id !== user._id
                      ).length
                    }
                    color="secondary"
                  >
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show new notifications"
                  color="inherit"
                  onClick={() => {
                    setMsgOpen(false);
                    setNotifsOpen(!notifsOpen);
                  }}
                >
                  <Badge
                    badgeContent={
                      notifications.filter((n) => {
                        return (
                          (n.to?._id == user._id && !n.accepted) ||
                          (n.from?._id == user._id && n.accepted)
                        );
                      }).length
                    }
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
          {msgOpen ? (
            <div>
              <NewMessage history={history} />
            </div>
          ) : null}
          {notifsOpen ? <NewNotifs /> : null}
        </div>
      </ClickAwayListener>
    </>
  );
}

export default withRouter(Navbar);
