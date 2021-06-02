import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Profile from "../components/profile.component";
import { useSelector } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";
import { NotifContext } from "../contexts/notification.context";

const useStyles = makeStyles((theme) => ({
  textHeading: {
    marginTop: "5px",
    fontWeight: "bolder",
    textAlign: "center",
  },
}));

export default function People() {
  const classes = useStyles();
  const people = useSelector((state) => state.people.people);
  const { notifications } = useContext(NotifContext);

  const sentNotifs = (u) => {
    let ind = notifications.findIndex((n) => n.to._id === u._id);
    console.log(u, ind);
    if (ind < 0) {
      return false;
    }
    return true;
  };
  return (
    <div style={{ width: "100%" }}>
      {people.length ? (
        <Typography variant="h6" className={classes.textHeading}>
          {people.length} People Found!
        </Typography>
      ) : (
        <Typography variant="h6" className={classes.textHeading}>
          'No People Found
        </Typography>
      )}
      <Box display="flex" flexDirection="row" p={2} m={1}>
        {people.map((p, i) => (
          <Box p={1} m={2} key={p._id}>
            <Profile user={p} sentNotifs={sentNotifs} />
          </Box>
        ))}
      </Box>
    </div>
  );
}
