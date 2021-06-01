import { Avatar, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import { BEURL } from "../config";

export default function TinyProfile({ profile }) {
  return (
    <>
      <ListItemAvatar>
        <Avatar
          aria-label="recipe"
          src={
            profile.image &&
            `${BEURL}/profileImge/${profile.image}`
          }
        >
          {profile.image
            ? null
            : profile.name
            ? profile.name.charAt(0)
            : profile.fullname.charAt(0)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={profile.fullname ? profile.fullname : profile.name}
        secondary={profile.status}
      />
    </>
  );
}
