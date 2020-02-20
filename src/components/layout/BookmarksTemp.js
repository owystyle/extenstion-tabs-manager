import React, { useCallback, useState, useMemo } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import useBookmarks from "../library/useBookmarks";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const START_COUNT = 3;

function BookmarksTemp() {
  const { temp } = useBookmarks();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showAll, setShowAll] = useState(false);

  const handleOpen = useCallback(
    id => {
      dispatch({ type: "BOOKMARKS_OPEN_FOLDER", id });
    },
    [dispatch]
  );

  const items = useMemo(() => {
    return showAll ? temp : temp.filter((r, i) => i < START_COUNT);
  }, [temp, showAll]);

  if (temp.length === 0) return null;

  return (
    <>
      <List>
        {items.map(folder => (
          <ListItem
            button
            component="a"
            href={`popup.html#/dashboard/bookmark/${folder.id}`}
            key={folder.id}
            selected={location.pathname === `/dashboard/bookmark/${folder.id}`}
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={folder.title} />
            <ListItemSecondaryAction onClick={() => handleOpen(folder.id)}>
              <IconButton edge="end">
                <OpenInBrowser fontSize="small" color="primary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem button onClick={() => setShowAll(!showAll)}>
          <ListItemIcon>
            {showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemIcon>
          <ListItemText primary={`${showAll ? "Show less" : "Show all"}`} />
        </ListItem>
      </List>
      <Divider />
    </>
  );
}

export default BookmarksTemp;
