import { useSelector } from "react-redux";
import { selectByWindow } from "../../modules/tabs/selectors";
import useSelected from "./useSelected";

function useTabs() {
  const all = useSelector(selectByWindow);
  const selected = useSelected(all);

  return {
    all,
    ...selected,
  };
}

export default useTabs;
