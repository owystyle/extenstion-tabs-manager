import React, { useState, useCallback } from "react";
import { ListItem, ListItemIcon, ListItemText, Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { addBookmark } from "../../chrome";
import { useDispatch } from "react-redux";

function BookmarkAdd() {
  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleBlur = useCallback(() => {
    setAdding(false);
    setValue("");
  }, []);

  const handleChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      // TODO use saga here
      addBookmark({ title: value }, () => {
        dispatch({ type: "BOOKMARKS_GET" });
      });
      handleBlur();
    },
    [dispatch, value, handleBlur]
  );

  if (adding) {
    return (
      <ListItem>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <form onSubmit={handleSubmit}>
              <Input
                autoFocus
                onBlur={handleBlur}
                onChange={handleChange}
                value={value}
              />
            </form>
          }
        />
      </ListItem>
    );
  } else {
    return (
      <ListItem button onClick={() => setAdding(true)}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="New Folder" />
      </ListItem>
    );
  }
}

export default BookmarkAdd;
