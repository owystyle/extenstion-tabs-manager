export const selectByWindow = state => {
  const tabsById = state.tabs.byId;
  const tabsAllIds = state.tabs.allIds;

  const windows = tabsAllIds.reduce((acc, tabId) => {
    return acc.indexOf(tabsById[tabId].windowId) < 0
      ? acc.concat(tabsById[tabId].windowId)
      : acc;
  }, []);

  const tabs = tabsAllIds.reduce((acc, tabId) => {
    return acc.concat(tabsById[tabId]);
  }, []);

  return windows.reduce((acc, item) => {
    return acc.concat({
      id: item,
      children: tabs.filter(itm => itm.windowId === item),
    });
  }, []);
};
