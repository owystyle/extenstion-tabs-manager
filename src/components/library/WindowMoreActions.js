import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { Typography, Divider } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import useBookmarks from "./useBookmarks";
import AddIcon from "@material-ui/icons/Add";
import HistoryIcon from "@material-ui/icons/History";

const useStyles = makeStyles(theme => ({
  listIcon: {
    minWidth: 32,
  },
}));

function WindowMoreActions({ id, children }) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { temp } = useBookmarks();
  const [menuEl, setMenuEl] = useState(null);
  const [menuKeepEl, setMenuKeepEl] = useState(null);

  const handleFocusTab = useCallback(tabId => {
    // window.chrome.windows.update(id, { focused: true }, () => {
    //   window.chrome.tabs.update(tabId, { active: true });
    // });

    handleCloseMenu();
  }, []);

  const handleClickMore = (e, id) => {
    console.log("dsfdsfdsf", id);
    setMenuEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuEl(null);
  };

  const handleCloseTab = useCallback(
    id => {
      dispatch({
        type: "TABS_CLOSE",
        tabs: id,
      });
      handleCloseMenu();
    },
    [dispatch]
  );

  const handleCloseKeepMenu = () => {
    setMenuKeepEl(null);
  };

  const handleKeepClick = (e, id) => {
    setMenuKeepEl(e.currentTarget);
    handleCloseMenu();
  };

  return (
    <>
      {children({ onMoreClick: handleClickMore })}
      <Menu
        anchorEl={menuEl}
        keepMounted
        open={Boolean(menuEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleFocusTab(1)}>Set Focus</MenuItem>
        <Divider />
        <MenuItem onClick={e => handleKeepClick(e, 1)}>Keep</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Bookmark</MenuItem>
        <MenuItem onClick={() => handleCloseTab(1)}>Close</MenuItem>
      </Menu>
      <Menu
        anchorEl={menuKeepEl}
        keepMounted
        open={Boolean(menuKeepEl)}
        onClose={handleCloseKeepMenu}
      >
        <MenuItem>
          <ListItemIcon className={styles.listIcon}>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Create New</Typography>
        </MenuItem>
        <Divider />
        {temp.map(folder => (
          <MenuItem key={folder.id}>
            <ListItemIcon className={styles.listIcon}>
              <HistoryIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">{folder.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default WindowMoreActions;
