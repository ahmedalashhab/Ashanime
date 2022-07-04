import React, { useEffect, useState } from "react";
import { Player, Hls } from "@vime/react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import axios from "axios";
import { setStream } from "../../redux/search-slice";

const VideoPlayer = () => {
  const [loading, setLoading] = useState(true);
  const [videoLink, setVideoLink] = useState("");

  const streamId = useSelector((state: RootState) => state.anime.streamId);
  const stream = useSelector((state: RootState) => state.anime.stream);

  const dispatch = useAppDispatch();

  const hlsConfig = {
    // ...
  };

  const getEpisodeStream = async () => {
    await axios
      .get(`https://gogoanime.herokuapp.com/vidcdn/watch/${streamId}`)
      .then(async (response) => {
        const data = response.data;
        dispatch(setStream(data));
        setVideoLink(streamData.sources[0].file);
        setLoading(false);
      });
  };

  const streamData = useSelector((state: RootState) => state.anime.stream);

  useEffect(() => {
    const getData = async () => {
      await getEpisodeStream();
    };
    getData();
  }, [streamId]);

  // if (streamData.length === 0) {
  //   return <div>Loading...</div>;
  // }

  // const videoLink =
  //   "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

  // useEffect(() => {
  //   if (Object.keys(streamData).length > 0 && streamData.length > 0) {
  //     setLoading(false);
  //     console.log("inside effect");
  //     setVideoLink(streamData?.sources[0]?.file);
  //   }
  // }, [streamData, videoLink]);

  return (
    <>
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ height: 400 }}
        >
          <span className="text-white outfit-medium ">
            {/*if no video URL then display below message*/}
            Loading...
          </span>
        </div>
      ) : (
        <Player controls>
          <Hls version="latest" config={hlsConfig} poster="/media/poster.png">
            {videoLink && (
              <source data-src={videoLink} type="application/x-mpegURL" />
            )}
          </Hls>
          {/* ... */}
        </Player>
      )}
    </>
  );
};

export default VideoPlayer;

//
