import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectById } from "../../modules/bookmarks/selectors";

function useFolder() {
  const params = useParams();
  const folder = useSelector(state => selectById(state, params.id));

  return folder;
}

export default useFolder;
