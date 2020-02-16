import { useSelector } from "react-redux";
import { selectMain, selectTemp } from "../../modules/bookmarks/selectors";

function useBookmarks() {
  const bookmarks = useSelector(selectMain);
  const tempBookmarks = useSelector(selectTemp);

  return {
    temp: tempBookmarks,
    bookmarks: bookmarks,
  };
}

export default useBookmarks;
