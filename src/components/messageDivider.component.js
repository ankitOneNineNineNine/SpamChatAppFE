import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelIcon from "@material-ui/icons/Label";
import DraftsIcon from "@material-ui/icons/Drafts";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    marginTop: "10%",
    backgroundColor: theme.palette.background.paper,
  },
  inbox: {
    color: "green",
  },

  spam: {
    color: "blue",
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}



function MessageDividers({ history }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    history.push(`?${index ? 'spam' : ''}`)
  };
  return (
    <div className={classes.root}>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(e) => handleListItemClick(e, 0)}
        >
          <ListItemIcon>
            <InboxIcon className={classes.inbox} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(e) => handleListItemClick(e, 1)}
        >
          <ListItemIcon>
            <LabelIcon className={classes.spam} />
          </ListItemIcon>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}


export default withRouter(MessageDividers)