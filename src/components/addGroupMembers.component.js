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
import { useSelector } from "react-redux";
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
  admins,
  me,
  edit = false,
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
            {edit ? (
              admins &&
              admins.includes(me._id) && (
                <TextField
                  id="standard-basic"
                  label="Search Friends"
                  style={{ width: "100%" }}
                  onChange={searchFriendsChange}
                />
              )
            ) : (
              <TextField
                id="standard-basic"
                label="Search Friends"
                style={{ width: "100%" }}
                onChange={searchFriendsChange}
              />
            )}
          </CardContent>
          <CardContent className={classes.listAdded}>
            {userAdded.map((a, i) => (
              <Chip
                key={i}
                icon={<FaceIcon />}
                label={a.fullname}
                onDelete={
                  a._id !== me._id
                    ? edit
                      ? admins.includes(me._id)
                        ? () => {
                            setUserAdded(
                              userAdded.filter((user) => user._id !== a._id)
                            );
                          }
                        : null
                      : () => {
                          setUserAdded(
                            userAdded.filter((user) => user._id !== a._id)
                          );
                        }
                    : null
                }
                color="secondary"
              />
            ))}
          </CardContent>
          {edit ? (
            admins &&
            admins.includes(me._id) && (
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
            )
          ) : (
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
          )}

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
