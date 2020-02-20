import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Backdrop,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import SettingsIcon from "@material-ui/icons/Settings";
import BookmarksTree from "./BookmarksTree";
import BookmarksTemp from "./BookmarksTemp";
import ActionsToolbar from "./ActionsToolbar";
import SearchToolbar from "./SearchToolbar";
import config from "../../config";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
}));

function Main({ children }) {
  const classes = useStyles();
  const location = useLocation();
  const app = useSelector(state => state.app);

  console.log("LAYOUT RENDER");

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" style={{ color: "#fff" }}>
            {config.appName}
          </Typography>

          <SearchToolbar />
          <ActionsToolbar />

          <div className={classes.grow} />

          <IconButton
            edge="end"
            style={{ color: "#fff" }}
            href="popup.html#/dashboard/settings"
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem
            button
            component="a"
            href="popup.html#/dashboard"
            selected={location.pathname === "/dashboard"}
          >
            <ListItemIcon>
              <DynamicFeedIcon />
            </ListItemIcon>
            <ListItemText primary={<b>Active tabs</b>} />
          </ListItem>
        </List>
        <Divider />
        <BookmarksTemp />
        <BookmarksTree />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <Backdrop
        className={classes.backdrop}
        open={app.dirty}
        onClick={() => {}}
      >
        <Typography variant="h2" style={{ color: "#fff" }}>
          Reload
        </Typography>
      </Backdrop>
    </div>
  );
}

export default Main;
