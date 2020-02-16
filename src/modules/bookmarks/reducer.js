import { combineReducers } from "redux";

const status = (state = {}, action) => {
  switch (action.type) {
    case "BOOKMARKS_GET":
      return {
        ...state,
      };

    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case "BOOKMARKS_SET":
      return action.payload;

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case "BOOKMARKS_SET":
      return Object.keys(action.payload);

    default:
      return state;
  }
};

export default {
  bookmarks: combineReducers({
    status,
    byId,
    allIds,
  }),
};
