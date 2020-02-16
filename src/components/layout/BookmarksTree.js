import React from "react";
import { useLocation } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import useBookmarks from "../library/useBookmarks";
import BookmarkAdd from "./BookmarkAdd";

function BookmarksTree() {
  const { bookmarks } = useBookmarks();
  const location = useLocation();

  return (
    <List>
      {bookmarks.map(folder => (
        <ListItem
          button
          component="a"
          href={`popup.html#/dashboard/bookmark/${folder.id}`}
          key={folder.id}
          selected={location.pathname === `/dashboard/bookmark/${folder.id}`}
        >
          <ListItemIcon>
            <CollectionsBookmarkIcon />
          </ListItemIcon>
          <ListItemText primary={folder.title} />
        </ListItem>
      ))}
      <BookmarkAdd />
    </List>
  );
}

export default BookmarksTree;
