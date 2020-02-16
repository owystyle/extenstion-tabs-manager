import { spawn, call, all, take } from "redux-saga/effects";

function* logActions() {
  while (true) {
    const action = yield take("*");
    console.log(action);
  }
}

const defaultSagas = [logActions];

function* rootSaga(sagas) {
  yield all(
    [...sagas, ...defaultSagas].map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}

export default rootSaga;
