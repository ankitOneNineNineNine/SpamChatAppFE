import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { InputAdornment } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import CancelIcon from "@material-ui/icons/Cancel";
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
    cursor: "pointer",
  },
  send: {
    cursor: "pointer",
  },
  noDisp: {
    display: "none",
  },
  imageSelectedDisplay: {
    display: "flex",
  },
  imgSDisp: {
    width: "40px",
    height: "40px",
    border: "2px solid black",
    margin: "5px",
    cursor: "pointer",
  },
  imgDispContainer: {
    position: "relative",
  },
  cross: {
    position: "absolute",
    left: 0,
    cursor: "pointer",
  },
}));

export default function InputMessage({
  images,
  messageChange,
  messageSend,
  imageSelect,
  textMsg,
  removeImage,
}) {
  const classes = useStyles();
  const inputImageRef = useRef(null);

  const keySend = (evt) => {
    if (evt.keyCode == 13 && !evt.shiftKey) {
      if (textMsg.length) {
        messageSend();
      }
    }
  };

  const imgS = (e) => {
  
    inputImageRef.current.click();
  };
  return (
    <div className={classes.root}>
      <input
        type="file"
        ref={inputImageRef}
        onChange={imageSelect}
        className={classes.noDisp}
        multiple
        accept ="image/*"
      />
      <div className={classes.imageSelectedDisplay}>
        {images.length
          ? images.map((img, i) => {
              return (
                <div key={i} className={classes.imgDispContainer}>
                  <img
                    className={classes.imgSDisp}
                    src={URL.createObjectURL(img)}
                  />
                  <CancelIcon
                    className={classes.cross}
                    onClick={() => removeImage(i)}
                  />
                </div>
              );
            })
          : null}
      </div>
      <TextField
        multiline
        onChange={(e) => messageChange(e.target.value)}
        rowsMax={2}
        id="standard-full-width"
        label="Enter your Message Here"
        onKeyDown={keySend}
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        value={textMsg}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end" className={classes.imageSelect}>
                <ImageIcon onClick={imgS} />
              </InputAdornment>
              <InputAdornment position="end" className={classes.send}>
                <SendIcon onClick={() => messageSend()} />
              </InputAdornment>
            </>
          ),
        }}
      />
    </div>
  );
}
