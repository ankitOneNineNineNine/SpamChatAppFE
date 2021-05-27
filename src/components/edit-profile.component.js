import React, { useContext, useEffect, useRef, useState } from "react";
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
import PublishIcon from "@material-ui/icons/Publish";
import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  Tooltip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../contexts/socket.context";
import CheckIcon from "@material-ui/icons/Check";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import CancelIcon from "@material-ui/icons/Cancel";
import { PUT } from "../adapters/http.adapter";
import { setUser } from "../common/actions";
import { displaySuccess } from "../common/toaster";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "70.25%", // 16:9
    [theme.breakpoints.down("400")]: {
      paddingTop: "150px",
    },
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
  upload: {
    position: "relative",
    top: "-50px",
    left: "5px",
    backgroundColor: "#a2a2d9",
    "&:hover": {
      background: "#7272f4",
    },
  },
  error: {
    color: "red",
  },
  hideInput: {
    display: "none",
  },
}));

export default function EditProfile({ setEdit }) {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);
  const [credentials, setCredentials] = useState({
    fullname: user.fullname,
  });
  const [error, setError] = useState(false);
  const { socket } = useContext(SocketContext);
  const uploadImage = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    validate();
  }, [credentials]);
  const validate = () => {
    if (!credentials.fullname) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const onEdit = async (e) => {
    e.preventDefault();

    if (!error) {
      let formData = new FormData();
      if (credentials.fullname)
        formData.append("fullname", credentials.fullname);
      if (credentials.address) formData.append("address", credentials.address);
      if (credentials.image) formData.append("image", credentials.image);
      let resp = await PUT("/user/", formData, true, "multipart/form-data");
      displaySuccess(resp);
      dispatch(setUser({ token: localStorage.getItem("i_hash") }));
      setCredentials({ fullname: user.fullname });
      setEdit(false);
    }
  };
  const updateFormChange = (e) => {
    let value;
    if (e.target.name === "image") {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    setCredentials({ ...credentials, [e.target.name]: value });
  };

  return (
    <Card
      className={classes.root}
      style={{
        display: "block",
        margin: "auto",
        marginTop: "60px",
      }}
    >
      <input
        type="file"
        className={classes.hideInput}
        accept=".jpg, .jpeg, .png"
        ref={uploadImage}
        name="image"
        onChange={updateFormChange}
      />
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
        title={user.fullname}
        subheader={user.status}
      />
      <CardMedia
        className={classes.media}
        image={
          credentials.image
            ? URL.createObjectURL(credentials.image)
            : user.image
            ? `http://localhost:8000/profileImge/${user.image}`
            : `${process.env.PUBLIC_URL}/userimage.jpg`
        }
        title="Profile Picture"
      >
        {credentials.image ? (
          <Tooltip title="Cancel Image">
            <IconButton
              aria-label="upload"
              className={classes.upload}
              onClick={() => {
                setCredentials({ ...credentials, image: null });
              }}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Upload Image">
            <IconButton
              aria-label="upload"
              className={classes.upload}
              onClick={() => {
                uploadImage.current.click();
              }}
            >
              <PublishIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardMedia>
      <CardActions
        disableSpacing
        onClick={() => {
          setEdit(false);
        }}
      >
        <Tooltip title="Go-Back">
          <IconButton aria-label="Go-Back">
            <CancelIcon />
            <Typography variant="caption" style={{ fontWeight: "bolder" }}>
              Go Back
            </Typography>
          </IconButton>
        </Tooltip>
      </CardActions>
      <CardContent>
        <Typography component="h5" variant="caption" className={classes.error}>
          {error ? "Full Name is Required" : ""}
        </Typography>
        <TextField
          label="Fullname"
          id="standard-required"
          name="fullname"
          required
          defaultValue={user.fullname}
          onChange={updateFormChange}
        />

        <Divider />
        <Typography paragraph>
          {user.email}
          <Typography paragraph variant="caption">
            Not Editable
          </Typography>
        </Typography>
        <Typography paragraph>
          {user.username}
          <Typography paragraph variant="caption">
            Not Editable
          </Typography>
        </Typography>
        <TextField
          name="address"
          label="Address"
          defaultValue={user.address}
          onChange={updateFormChange}
          placeholder="Address"
        />
      </CardContent>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onEdit}
      >
        Edit
      </Button>
    </Card>
  );
}
