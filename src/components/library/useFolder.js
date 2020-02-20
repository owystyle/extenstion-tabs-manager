import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
  },
  favicon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  grid: {
    alignItems: "center",
  },
}));

function useFolder(props) {
  const styles = useStyles();
  const { id } = props;
  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    dispatch({ type: "BOOKMARKS_OPEN_FOLDER", id });
  }, [dispatch, id]);

  const handleNewTab = useCallback(
    tab => {
      dispatch({ type: "BOOKMARKS_OPEN", tab });
    },
    [dispatch]
  );

  return {
    styles,
    onOpen: handleOpen,
    onNewTab: handleNewTab,
    ...props,
  };
}

export default useFolder;
