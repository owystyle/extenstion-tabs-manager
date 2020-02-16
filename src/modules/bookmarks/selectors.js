import config from "../../config";

export const selectAll = state => {
  const bookmarksById = state.bookmarks.byId;
  const bookmarksAllIds = state.bookmarks.allIds;

  return bookmarksAllIds.reduce((acc, id) => {
    return acc.concat(bookmarksById[id]);
  }, []);
};

export const selectTemp = state => {
  const folder =
    state.bookmarks.byId[state.config[config.tempFolder.storeIdKey]];
  if (!folder) return [];

  return folder.children;
};

export const selectMain = state => {
  const folder =
    state.bookmarks.byId[state.config[config.mainFolder.storeIdKey]];
  if (!folder) return [];

  return folder.children;
};

export const selectById = (state, id) => {
  const all = selectAll(state);
  const flat = all.reduce((acc, item) => {
    return acc.concat(item.children);
  }, []);

  return flat.find(item => item.id === id);
};
