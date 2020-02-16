import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import useActionsToolbar from "./useActionsToolbar";

function ActionsToolbar() {
  const { selected, onKeep, onBookmark, onClose } = useActionsToolbar();

  return (
    <div style={{ marginBottom: 20 }}>
      <ButtonGroup size="small">
        <Button
          disabled={selected.length === 0}
          variant="contained"
          color="primary"
          onClick={onKeep}
        >
          Keep {selected.length || ""}
        </Button>
        <Button
          disabled={selected.length === 0}
          variant="contained"
          onClick={onBookmark}
        >
          Bookmark {selected.length || ""}
        </Button>
        <Button
          disabled={selected.length === 0}
          variant="contained"
          onClick={onClose}
        >
          Close {selected.length || ""}
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ActionsToolbar;
