import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useTabs from "../library/useTabs";
import config from "../../config";

function useActionsToolbar() {
  const dispatch = useDispatch();
  const configStore = useSelector(state => state.config);
  const { all, selected, setSelected } = useTabs();

  const handleKeep = useCallback(() => {
    if (selected.length === 0) return;

    const flat = all.reduce((acc, item) => acc.concat(item.children), []);
    const children = selected.map(item => flat.find(itm => itm.id === item));

    dispatch({
      type: "BOOKMARKS_SAVE",
      data: {
        title: `New Window`,
        children,
      },
    });

    setSelected([]);
  }, [dispatch, all, selected, setSelected]);

  const handleBookmark = useCallback(() => {
    if (selected.length === 0) return;

    const flat = all.reduce((acc, item) => acc.concat(item.children), []);
    const children = selected.map(item => flat.find(itm => itm.id === item));

    dispatch({
      type: "BOOKMARKS_SAVE",
      data: {
        parentId: configStore[config.mainFolder.storeIdKey],
        title: `New Folder`,
        children,
      },
    });

    setSelected([]);
  }, [dispatch, all, selected, configStore, setSelected]);

  const handleClose = useCallback(() => {
    if (selected.length === 0) return;

    dispatch({
      type: "TABS_CLOSE",
      tabs: selected,
    });

    setSelected([]);
  }, [dispatch, selected, setSelected]);

  return {
    selected,
    onKeep: handleKeep,
    onBookmark: handleBookmark,
    onClose: handleClose,
  };
}

export default useActionsToolbar;
