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
}));

function useWindow(props) {
  const styles = useStyles();
  const { id, children } = props;
  const dispatch = useDispatch();

  const handleFocusTab = useCallback(
    tabId => {
      window.chrome.windows.update(id, { focused: true }, () => {
        window.chrome.tabs.update(tabId, { active: true });
      });
    },
    [id]
  );

  const handleKeep = useCallback(() => {
    dispatch({
      type: "BOOKMARKS_SAVE",
      data: {
        title: `Window ${id}`,
        children: children,
      },
    });
  }, [dispatch, id, children]);

  return {
    styles,
    onKeep: handleKeep,
    onFocus: handleFocusTab,
    ...props,
  };
}

export default useWindow;
