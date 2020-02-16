import { eventChannel } from "redux-saga";
import { call, put, take, takeLatest } from "redux-saga/effects";
import { getStore as getChromeStore } from "../../chrome";

function* getConfig() {
  try {
    yield put({ type: "CONFIG_LOADING" });

    const data = yield call(getChromeStore);

    yield put({ type: "CONFIG_SET", payload: data });
  } catch (error) {
    yield put({ type: "CONFIG_ERROR" });
  }
}

export function* watchChanges() {
  const channel = eventChannel(emitter => {
    window.chrome.storage.onChanged.addListener(emitter);

    return () => {
      window.chrome.storage.onChanged.removeListener(emitter);
    };
  });

  while (true) {
    yield take(channel);
    yield put({ type: "CONFIG_GET" });
  }
}

function* watchConfig() {
  yield takeLatest("CONFIG_GET", getConfig);
}

export default [watchConfig, watchChanges];
