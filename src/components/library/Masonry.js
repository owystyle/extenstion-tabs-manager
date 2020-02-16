import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    columnGap: theme.spacing(3),
    columnCount: 2,
  },
  item: {
    marginBottom: theme.spacing(3),
    display: "inline-block",
    verticalAlign: "top",
    width: "100%",
  },
}));

function Masonry({ container, item, children }) {
  const styles = useStyles();

  return (
    <div className={container ? styles.container : styles.item}>{children}</div>
  );
}

export default Masonry;
