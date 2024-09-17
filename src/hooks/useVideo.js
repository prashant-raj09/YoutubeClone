import { useDispatch } from "react-redux";
import {YOUTUBE_VIDEOS_API} from "../utils/constant";
const useVideo = () => {

    const dispatch = useDispatch();
const getYoutubeVideos = async () => {
    const fetchData = await fetch (YOUTUBE_VIDEOS_API);
    const json = fetchData.json();
    dispatch();

}

  useEffect(()=>{
    getYoutubeVideos();
  },[]);
}

export default useVideo