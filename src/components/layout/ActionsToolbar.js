import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import HistoryIcon from "@material-ui/icons/History";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CloseIcon from "@material-ui/icons/Close";
import useActionsToolbar from "./useActionsToolbar";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(3),
  },
}));

function ActionsToolbar() {
  const classes = useStyles();
  const { selected, onKeep, onBookmark, onClose } = useActionsToolbar();
  const noneSelected = selected.length === 0;

  if (noneSelected) return null;

  return (
    <div className={classes.root}>
      <ButtonGroup size="small">
        <Button
          disabled={noneSelected}
          variant="contained"
          onClick={onKeep}
          startIcon={<HistoryIcon />}
        >
          Save Session {selected.length}
        </Button>
        <Button
          disabled={noneSelected}
          variant="contained"
          onClick={onBookmark}
          startIcon={<BookmarkBorderIcon />}
        >
          Bookmark {selected.length}
        </Button>
        <Button
          disabled={noneSelected}
          variant="contained"
          onClick={onClose}
          startIcon={<CloseIcon />}
        >
          Close {selected.length}
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ActionsToolbar;
