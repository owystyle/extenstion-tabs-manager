import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { sagaMiddleware } from "./configureSaga";
import rootReducer from "./rootReducer";

export default function configureStore(reducers, initialState) {
  return createStore(
    combineReducers({ ...rootReducer, ...reducers }),
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
}
