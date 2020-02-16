export default data => {
  if (!data[0]) return {};

  const bookmarks = data[0].children.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  }, {});

  return bookmarks;
};
