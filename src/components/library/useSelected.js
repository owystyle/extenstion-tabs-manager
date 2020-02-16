import { useContext, useCallback } from "react";
import { SelectedItemsContext } from "../providers/GlobalProvider";

function useSelected(all) {
  const { selected, setSelected } = useContext(SelectedItemsContext);

  const handleSelectAll = useCallback(
    (e, id) => {
      const rows = all.find(itm => itm.id === id).children;

      if (e.target.checked) {
        const ids = rows.reduce((acc, item) => {
          return selected.indexOf(item.id) === -1 ? acc.concat(item.id) : acc;
        }, []);

        const newSelecteds = selected.concat(ids);
        setSelected(newSelecteds);
        return;
      }

      const ids = rows.map(n => n.id);
      const remaining = selected.reduce((acc, item) => {
        return ids.indexOf(item) === -1 ? acc.concat(item) : acc;
      }, []);

      setSelected(remaining);
      console.log("SET ALL");
    },
    [selected, all, setSelected]
  );

  const handleSelect = id => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    console.log("SET");
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const isIndeterminate = id => {
    const rows = all.find(itm => itm.id === id).children;
    const ids = rows.map(n => n.id);

    console.log("isIndeterminate", id);

    return selected.some(r => ids.indexOf(r) !== -1);
  };

  const isAllSelected = id => {
    const rows = all.find(itm => itm.id === id).children;
    const ids = rows.map(n => n.id);

    console.log("isAllSelected", id);

    return ids.every(r => selected.indexOf(r) !== -1);
  };

  return {
    selected,
    setSelected,
    onSelectAll: handleSelectAll,
    onSelect: handleSelect,
    isSelected,
    isIndeterminate,
    isAllSelected,
  };
}

export default useSelected;
