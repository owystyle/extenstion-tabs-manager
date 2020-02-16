import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

export const sagaMiddleware = createSagaMiddleware();

export default function configureSaga(sagas) {
  return sagaMiddleware.run(rootSaga, sagas);
}
