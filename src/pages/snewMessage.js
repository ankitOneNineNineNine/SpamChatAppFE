import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Portal from "@material-ui/core/Portal";
import NewMessageComponent from "./message";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    position: "fixed",
    width: 200,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NewMessage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <button type="button" onClick={handleClick}>
          Open menu dropdown
        </button>
        {open ? (
          <div className={classes.dropdown}>
            <NewMessageComponent handleClickAway={handleClickAway} />
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
