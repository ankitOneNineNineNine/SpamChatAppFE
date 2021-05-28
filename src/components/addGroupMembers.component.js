import {
  Button,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import React from "react";
import TinyProfile from "./tinyProfile.component";
import FaceIcon from "@material-ui/icons/Face";
const useStyles = makeStyles((theme) => ({
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

  listSearched: {
    maxHeight: "300px",
    overflowY: "scroll",
  },
  listAdded: {
    maxHeight: "300px",
    overflowY: "scroll",
  },
}));

export default function AddGroupMembers({
  addUserBox,
  setAddUserBox,
  myFriends,
  setUserAdded,
  userAdded,
  searchFriendsChange,
}) {
  const classes = useStyles();
  return (
    <Modal
      open={addUserBox}
      onClose={() => {
        setAddUserBox(false);
      }}
    >
      <div>
        <Card className={classes.addPeopleBox}>
          <CardContent>
            <TextField
              id="standard-basic"
              label="Search Friends"
              style={{ width: "100%" }}
              onChange={searchFriendsChange}
            />
          </CardContent>
          <CardContent className={classes.listAdded}>
            {userAdded.map((a, i) => (
              <Chip
                key={i}
                icon={<FaceIcon />}
                label={a.fullname}
                onDelete={() => {
                  setUserAdded(userAdded.filter((user) => user._id !== a._id));
                }}
                color="secondary"
              />
            ))}
          </CardContent>
          <List className={classes.listSearched}>
            {myFriends.map((friend) => {
              return (
                <ListItem style={{ cursor: "pointer" }} key={friend._id}>
                  <TinyProfile profile={friend} />
                  {userAdded.findIndex((u) => u._id === friend._id) < 0 ? (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        setUserAdded([...userAdded, friend]);
                      }}
                    >
                      Add
                    </Button>
                  ) : null}
                </ListItem>
              );
            })}
          </List>

          <Button
            size="small"
            style={{ textAlign: "center" }}
            color="primary"
            onClick={() => {
              setAddUserBox(false);
            }}
          >
            Done
          </Button>
        </Card>
      </div>
    </Modal>
  );
}
