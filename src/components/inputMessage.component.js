import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { InputAdornment } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  imageSelect: {
      cursor: 'pointer',

  },
  send: {
      cursor: 'pointer'
  }
}));

export default function InputMessage({messageChange, messageSend, imageSelect}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        multiline
        onChange = {(e)=>messageChange(e.target.value)}
        rowsMax={3}
        id="standard-full-width"
        label="Enter your Message Here"
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end" className = {classes.imageSelect}>
                <ImageIcon />
              </InputAdornment>
              <InputAdornment position="end" className = {classes.send}>
                <SendIcon onClick = {()=>messageSend()} />
              </InputAdornment>
            </>
          ),
        }}
      />
    </div>
  );
}
