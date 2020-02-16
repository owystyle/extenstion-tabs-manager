import { eventChannel } from "redux-saga";
import { call, put, take, fork, takeLatest } from "redux-saga/effects";
import {
  getBookmarks as getChromeBookmarks,
  createBookmark as createChromeBookmark,
  createWindow as createChromeWindow,
  removeFolder as removeChromeFolder,
  createTab as createChromeTab,
} from "../../chrome";
import normalize from "./normalize";

function* getBookmarks() {
  try {
    yield put({ type: "BOOKMARKS_LOADING" });

    const data = yield call(getChromeBookmarks);
    const bookmarks = normalize(data);

    yield put({ type: "BOOKMARKS_SET", payload: bookmarks });
  } catch (error) {
    yield put({ type: "BOOKMARKS_ERROR" });
  }
}

function* saveBookmarks(data) {
  try {
    yield put({ type: "BOOKMARKS_LOADING" });

    const folder = yield call(createChromeBookmark, data.parentId, {
      title: data.title,
    });

    for (let i = 0; i < data.children.length; i++) {
      yield call(createChromeBookmark, folder.id, {
        title: data.children[i].title,
        url: data.children[i].url,
      });
    }

    const tabs = data.children.reduce((acc, item) => acc.concat(item.id), []);

    yield put({ type: "TABS_CLOSE", tabs });
    // yield put({ type: "BOOKMARKS_GET" });
  } catch (error) {
    yield put({ type: "BOOKMARKS_ERROR" });
  }
}

function* openBookmark(tab) {
  try {
    yield call(createChromeTab, { url: tab.url });
  } catch (error) {
    yield put({ type: "BOOKMARKS_ERROR" });
  }
}
function* openFolder(id) {
  try {
    const data = yield call(getChromeBookmarks, id);
    console.log("1", data);

    const tabs = data[0].children.reduce(
      (acc, item) => (item.url ? acc.concat(item.url) : acc),
      []
    );

    yield call(createChromeWindow, { url: tabs });
    yield call(removeChromeFolder, id);
    yield put({ type: "TABS_GET" });
    yield put({ type: "BOOKMARKS_GET" });
  } catch (error) {
    yield put({ type: "BOOKMARKS_ERROR" });
  }
}

function* watchOpen() {
  while (true) {
    const { tab } = yield take("BOOKMARKS_OPEN");
    yield fork(openBookmark, tab);
  }
}

function* watchOpenFolder() {
  while (true) {
    const { id } = yield take("BOOKMARKS_OPEN_FOLDER");
    yield fork(openFolder, id);
  }
}

function* watchSave() {
  while (true) {
    const { data } = yield take("BOOKMARKS_SAVE");
    yield fork(saveBookmarks, data);
  }
}

export function* watchChanges() {
  const channel = eventChannel(emitter => {
    window.chrome.bookmarks.onCreated.addListener(emitter);
    window.chrome.bookmarks.onRemoved.addListener(emitter);

    return () => {
      window.chrome.bookmarks.onCreated.removeListener(emitter);
      window.chrome.bookmarks.onRemoved.removeListener(emitter);
    };
  });

  while (true) {
    yield take(channel);
    yield put({ type: "BOOKMARKS_GET" });
  }
}

function* watchGet() {
  yield takeLatest("BOOKMARKS_GET", getBookmarks);
}

// export default [watchGet, watchChanges, watchOpen, watchSave, watchOpenFolder];
export default [watchGet, watchOpen, watchSave, watchOpenFolder];
