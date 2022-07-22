import React, {useEffect, useRef, useState} from "react";
import MoonLoader from "react-spinners/MoonLoader";
import {Player, Hls, Video, Ui, SettingsControl, Controls, DefaultUi} from "@vime/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import {setSavedCurrentTime} from "../../redux/videoState-slice";

interface props {
  animeStatus?: string;
}

const VideoPlayer = (props : props) => {
  const [loading, setLoading] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const videoplayer = useRef<HTMLVmPlayerElement>(null);

  const streamId = useSelector((state: RootState) => state.anime.streamId);
  const episodeSelected = useSelector(
    (state: RootState) => state.anime.episodeSelected
  );
  const animeTitle = useSelector(
    (state: RootState) => state.anime.modalData.animeTitle
  );
  const savedAnimeTitle = useSelector(
    (state: RootState) => state.videoState.savedAnimeTitle
  );
  const savedEpisode = useSelector(
    (state: RootState) => state.videoState.savedEpisode
  );
  const currentTime = useSelector(
    (state: RootState) => state.videoState.savedCurrentTime
  );
  const startTime = useSelector(
    (state: RootState) => state.videoState.savedStartTime
  );



  const dispatch = useDispatch();

  const seekForward = () => {
    dispatch(setSavedCurrentTime(currentTime + 10));
  }

  const onTimeUpdate = (event: CustomEvent<number>) => {
    dispatch(setSavedCurrentTime(event.detail));
  }

  const hlsConfig = {
    crossOrigin: "anonymous",
    enableWorker: false,
  };

  const getEpisodeStream = async () => {
    setLoading(true);
    await axios
      .get(`https://gogoanime.herokuapp.com/vidcdn/watch/${streamId}`)
      .then((response) => {
        setVideoLink(response.data.sources[0].file);
        setLoading(false);
      });
  };

  useEffect(() => {
    const getData = async () => {
      await getEpisodeStream();
    };
    if (streamId) {
      getData();
    }
  }, [streamId]);

  return (
    <div className="lg:h-96 h-56 ">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="sweet-loading">
            <MoonLoader color={"white"} loading={loading} size={60} />
          </div>
        </div>
      ) : (
        (!videoLink && (
          <div className="flex justify-center items-center w-full h-full">
            <span className="text-white outfit-medium ">
              {/*if no video URL then display below message and if animeStatus is upcoming say that it is upcoming */}
              {props.animeStatus === "Upcoming"
                ? "This anime is yet to be released."
                : "Select an episode to watch!"}
            </span>
          </div>
        )) || (
          <div>
            <Player  currentTime={currentTime}
            onVmCurrentTimeChange={onTimeUpdate} >
              {/*ts ignore*/}
              {videoLink && videoLink.includes("m3u8") ? (
                <Hls version="latest" config={hlsConfig}>
                  <source data-src={videoLink} type="application/x-mpegURL" />
                </Hls>
              ) : (
                <Video key={videoLink}>
                  <source data-src={videoLink} type="video/mp4" />
                </Video>
              )}
              <DefaultUi/>
            </Player>
          </div>
        )
      )}
    </div>
  );
};

export default VideoPlayer;

//
