export default data => {
  return data.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  }, {});
};
