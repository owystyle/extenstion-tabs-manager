import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectById } from "../../modules/bookmarks/selectors";

function useBookmark() {
  const params = useParams();
  const bookmark = useSelector(state => selectById(state, params.id));

  return bookmark;
}

export default useBookmark;
