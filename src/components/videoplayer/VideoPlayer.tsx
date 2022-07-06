import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { Player, Hls, Video } from "@vime/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";

const VideoPlayer = () => {
  const [loading, setLoading] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const streamId = useSelector((state: RootState) => state.anime.streamId);
  const episodeSelected = useSelector(
    (state: RootState) => state.anime.episodeSelected
  );

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
  }, [episodeSelected]);

  return (
    <>
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ height: 400 }}
        >
          <div className="sweet-loading">
            <MoonLoader color={"white"} loading={loading} size={60} />
          </div>
        </div>
      ) : (
        (!videoLink && (
          <div
            className="flex justify-center items-center"
            style={{ height: 400 }}
          >
            <span className="text-white outfit-medium ">
              {/*if no video URL then display below message*/}
              Select an episode to watch
            </span>
          </div>
        )) || (
          <div style={{ height: 400 }}>
            <Player controls>
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
            </Player>
          </div>
        )
      )}
    </>
  );
};

export default VideoPlayer;

//
