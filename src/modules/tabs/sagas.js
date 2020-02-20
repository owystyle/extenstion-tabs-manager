import { eventChannel } from "redux-saga";
import { call, put, fork, take, takeLatest } from "redux-saga/effects";
import {
  getTabs as getChromeTabs,
  getCurrentTab as getCurrentChromeTab,
  closeTabs as closeChromeTabs,
} from "../../chrome";
import normalize from "./normalize";

function* getTabs() {
  try {
    yield put({ type: "TABS_LOADING" });

    const data = yield call(getChromeTabs, {});
    const tabs = normalize(data);

    yield put({ type: "TABS_SET", payload: tabs });
  } catch (error) {
    yield put({ type: "TABS_ERROR" });
  }
}

function* closeTabs(tabs) {
  try {
    yield call(closeChromeTabs, tabs);
    yield put({ type: "TABS_GET" });
    yield put({ type: "BOOKMARKS_GET" });
  } catch (error) {
    yield put({ type: "TABS_ERROR" });
  }
}

function* watchTabsClose() {
  while (true) {
    const { tabs } = yield take("TABS_CLOSE");
    yield fork(closeTabs, tabs);
  }
}

export function* watchChanges() {
  const tab = yield call(getCurrentChromeTab);

  const channel = eventChannel(emitter => {
    const onChange = tabId => {
      if (tab && tabId !== tab.id) {
        console.log("!!! CHANGED", tabId);
        emitter(tabId);
      }
    };

    window.chrome.tabs.onUpdated.addListener(onChange);
    window.chrome.tabs.onCreated.addListener(onChange);
    window.chrome.tabs.onRemoved.addListener(onChange);
    window.chrome.tabs.onMoved.addListener(emitter);
    window.chrome.tabs.onDetached.addListener(emitter);
    window.chrome.tabs.onAttached.addListener(emitter);

    return () => {
      window.chrome.tabs.onUpdated.removeListener(onChange);
      window.chrome.tabs.onCreated.removeListener(onChange);
      window.chrome.tabs.onRemoved.removeListener(onChange);
      window.chrome.tabs.onMoved.removeListener(emitter);
      window.chrome.tabs.onDetached.removeListener(emitter);
      window.chrome.tabs.onAttached.removeListener(emitter);
    };
  });

  while (true) {
    yield take(channel);
    yield put({ type: "TABS_GET" });
  }
}

function* watchTabs() {
  yield takeLatest("TABS_GET", getTabs);
}

export default [watchTabs, watchChanges, watchTabsClose];
// export default [watchTabs, watchTabsClose];
