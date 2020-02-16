import config from "../config";

export const newTab = (path, callback = () => {}) => {
  window.chrome.tabs.create(
    { url: window.chrome.extension.getURL(`popup.html#${path}`) },
    callback
  );
};

export const createTab = params => {
  return new Promise((resolve, reject) => {
    window.chrome.tabs.create(params, tab => {
      resolve(tab);
    });
  });
};

export const getStore = () => {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.get(config => {
      resolve(config);
    });
  });
};

export const getCurrentTab = () => {
  return new Promise((resolve, reject) => {
    window.chrome.tabs.getCurrent(tab => {
      resolve(tab);
    });
  });
};

export const getTabs = params => {
  return new Promise((resolve, reject) => {
    window.chrome.tabs.query(params, tabs => {
      resolve(tabs);
    });
  });
};

export const closeTabs = ids => {
  return new Promise((resolve, reject) => {
    window.chrome.tabs.remove(ids, () => {
      resolve();
    });
  });
};

export const createWindow = data => {
  return new Promise((resolve, reject) => {
    window.chrome.windows.create(data, () => {
      resolve();
    });
  });
};

export const removeFolder = id => {
  return new Promise((resolve, reject) => {
    window.chrome.bookmarks.removeTree(id, () => {
      resolve();
    });
  });
};

export const getBookmarks = (folderId = null) => {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.get(config.rootFolder.storeIdKey, store => {
      window.chrome.bookmarks.getSubTree(
        folderId || store[config.rootFolder.storeIdKey],
        tree => {
          resolve(tree);
        }
      );
    });
  });
};

export const createBookmark = (parentId = null, data = {}) => {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.get(config.tempFolder.storeIdKey, store => {
      window.chrome.bookmarks.create(
        {
          ...data,
          parentId: parentId || store[config.tempFolder.storeIdKey],
        },
        bookmark => {
          resolve(bookmark);
        }
      );
    });
  });
};

export const addBookmark = (object = {}, callback = () => {}) => {
  window.chrome.storage.sync.get(config.mainFolder.storeIdKey, store => {
    window.chrome.bookmarks.create(
      {
        parentId: store[config.mainFolder.storeIdKey],
        ...object,
      },
      callback
    );
  });
};

export const syncFolder = (id = null, data = {}, callback = () => {}) => {
  window.chrome.storage.sync.get(data.storeIdKey, store => {
    if (Object.keys(store).length < 1) {
      window.chrome.bookmarks.create(
        {
          parentId: id,
          title: data.title,
        },
        folder => {
          window.chrome.storage.sync.set(
            { [data.storeIdKey]: folder.id },
            () => {
              callback(folder);
            }
          );
        }
      );
    } else {
      callback({ id: store[data.storeIdKey] });
    }
  });
};
