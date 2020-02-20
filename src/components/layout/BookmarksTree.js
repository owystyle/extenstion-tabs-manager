import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import useBookmarks from "../library/useBookmarks";
import BookmarkAdd from "./BookmarkAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const START_COUNT = 3;

function BookmarksTree() {
  const { bookmarks } = useBookmarks();
  const location = useLocation();
  const [showAll, setShowAll] = useState(false);

  const items = useMemo(() => {
    return showAll ? bookmarks : bookmarks.filter((r, i) => i < START_COUNT);
  }, [bookmarks, showAll]);

  return (
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
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText primary={folder.title} />
        </ListItem>
      ))}
      {/* {showAll && <BookmarkAdd />} */}
      <ListItem button onClick={() => setShowAll(!showAll)}>
        <ListItemIcon>
          {showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>
        <ListItemText primary={`${showAll ? "Show less" : "Show all"}`} />
      </ListItem>
    </List>
  );
}

export default BookmarksTree;
