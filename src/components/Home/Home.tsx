import SearchBar from "../Shared/SearchBar";
import AnimeTrailersHome from "./AnimeTrailersHome";
import TopAnime from "./TopAnime";
import Sidebar from "../Shared/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// @ts-ignore
import YoutubeBackground from "react-youtube-background";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const userSignedIn = typeof localStorage.getItem("user") === "string";
  console.log(userSignedIn);

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  useEffect(() => {
    !userSignedIn && navigate("/login");
    window.scrollTo(0, 0);
  }, []);

  return (
    <YoutubeBackground
      videoId={"NooIc3dMncc"} /* default -> null */
      aspectRatio={"16:9"} /* default -> "16:9" */
      overlay={"rgba(0,0,0,.4)"} /* default -> null | e.g. "rgba(0,0,0,.4)" */
      className={"h-5/6 h-max"} /* default -> null */
      nocookie={
        false
      } /* default -> false | sets host to https:/*www.youtube-nocookie.com to avoid loading Google's cookies */
      playerOptions={
        ""
      } /* default -> {}  | https://developers.google.com/youtube/player_parameters*/
      onReady={null} /* default -> null | returns event with player object */
      onEnd={"loop"} /* default -> null | returns event with player object */
      onPlay={null} /* default -> null | returns event with player object */
      onPause={null} /* default -> null | returns event with player object */
      onError={null} /* default -> null | returns event with player object */
      onStateChange={
        null
      } /* default -> null | returns event with player object */
      onPlaybackRateChange={
        null
      } /* default -> null | returns event with player object */
      onPlaybackQualityChange={
        null
      } /* default -> null | returns event with player object */
    >
      <div>
        <Sidebar paginate={(pageNumber: number) => paginate(pageNumber)} />
        <div className="flex justify-center">
          <div className="flex flex-col screen-width ml-44 mt-16 overflow-x-hidden">
            <SearchBar />
            <AnimeTrailersHome />
            {
              <TopAnime
                currentPage={currentPage}
                paginate={(pageNumber: number) => paginate(pageNumber)}
              />
            }
          </div>
        </div>
      </div>
    </YoutubeBackground>
  );
};

export default Home;
