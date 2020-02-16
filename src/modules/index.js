import {
  sagasToInstall as configSagas,
  storeToInstall as configStore,
} from "./config";

import {
  sagasToInstall as tabsSagas,
  storeToInstall as tabsStore,
} from "./tabs";

import {
  sagasToInstall as bookmarksSagas,
  storeToInstall as bookmarksStore,
} from "./bookmarks";

export const stores = {
  ...configStore,
  ...tabsStore,
  ...bookmarksStore,
};

export const sagas = [...configSagas, ...tabsSagas, ...bookmarksSagas];
