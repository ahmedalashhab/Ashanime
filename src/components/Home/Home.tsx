import AnimeTrailersHome from "./AnimeTrailersHome";
import TopAnime from "./TopAnime";
import Navbar from "../Shared/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// @ts-ignore
import YoutubeBackground from "react-youtube-background";
import MobileNavTW from "../Shared/MobileNavTW";
// @ts-ignore
import logo from "../../assets/logo-long.png";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const userSignedIn = typeof localStorage.getItem("user") === "string";

  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  useEffect(() => {
    !userSignedIn && navigate("/login");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{ height: "auto" }}
      className="overflow-x-hidden flex flex-col justify-center items-center"
    >
      <div className="absolute top-0 w-full bg-fixed">
        <YoutubeBackground
          videoId={"z9Ug-3qhrwY"} /* default -> null */
          aspectRatio={"16:9"} /* default -> "16:9" */
          overlay={
            "rgba(0,0,0,.4)"
          } /* default -> null | e.g. "rgba(0,0,0,.4)" */
          className={
            "lg:visible invisible video-background dark-gradiant-video overflow-y-visible"
          } /* default -> null */
          nocookie={
            false
          } /* default -> false | sets host to https:/*www.youtube-nocookie.com to avoid loading Google's cookies */
          playerOptions={{
            loop: 1,
            autoplay: 1,
            modestBranding: 1,
          }} /* default -> {}  | https://developers.google.com/youtube/player_parameters*/
          onReady={
            null
          } /* default -> null | returns event with player object */
          onEnd={null} /* default -> null | returns event with player object */
          onPlay={null} /* default -> null | returns event with player object */
          onPause={
            null
          } /* default -> null | returns event with player object */
          onError={
            null
          } /* default -> null | returns event with player object */
          onStateChange={
            null
          } /* default -> null | returns event with player object */
          onPlaybackRateChange={
            null
          } /* default -> null | returns event with player object */
          onPlaybackQualityChange={
            null
          } /* default -> null | returns event with player object */
          loop={1}
          playlist={["F0evM-hBlcI"]}
        >
          <div>
            {/*<MobileNav*/}
            {/*  paginate={(pageNumber: number) => paginate(pageNumber)}*/}
            {/*/>*/}

            <Navbar paginate={(pageNumber: number) => paginate(pageNumber)} />
            <div className="flex justify-center"></div>
          </div>
        </YoutubeBackground>
        <MobileNavTW paginate={(pageNumber: number) => paginate(pageNumber)} />
      </div>

      <div className="flex flex-col lg:w-[1440px] w-screen large-margin lg:px-12 px-4 overflow-x-hidden">
        <AnimeTrailersHome />
        {
          <TopAnime
            currentPage={currentPage}
            paginate={(pageNumber: number) => paginate(pageNumber)}
          />
        }
      </div>
    </div>
  );
};

export default Home;
