const initialState = {
  dirty: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "APP_DIRTY":
      return {
        ...state,
        dirty: true,
      };

    default:
      return state;
  }
};

export default {
  app: rootReducer,
};
