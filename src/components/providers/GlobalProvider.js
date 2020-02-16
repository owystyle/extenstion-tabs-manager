import React, { useMemo, useState, createContext } from "react";

const selectedItemsInitialState = { selected: [], setSelected: undefined };
const SelectedItemsContext = createContext(selectedItemsInitialState);

function GlobalStateProvider({ children }) {
  const [selected, setSelected] = useState(selectedItemsInitialState.selected);
  const selectedItemsValue = useMemo(() => ({ selected, setSelected }), [
    selected,
  ]);

  return (
    <SelectedItemsContext.Provider value={selectedItemsValue}>
      {children}
    </SelectedItemsContext.Provider>
  );
}

export default GlobalStateProvider;
export { SelectedItemsContext };
