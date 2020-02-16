const reducer = (state = {}, action) => {
  switch (action.type) {
    case "CONFIG_SET":
      return action.payload;

    default:
      return state;
  }
};

export default {
  config: reducer,
};
