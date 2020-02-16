import { combineReducers } from "redux";

const status = (state = {}, action) => {
  switch (action.type) {
    case "TABS_GET":
      return {
        ...state,
      };

    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case "TABS_SET":
      return action.payload;

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case "TABS_SET":
      return Object.keys(action.payload);

    default:
      return state;
  }
};

export default {
  tabs: combineReducers({
    status,
    byId,
    allIds,
  }),
};
