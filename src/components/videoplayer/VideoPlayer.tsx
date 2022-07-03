import React, { useEffect, useState } from "react";
import { Player, Hls } from "@vime/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const VideoPlayer = () => {
  const [loading, setLoading] = useState(true);
  const [videoLink, setVideoLink] = useState("");

  const hlsConfig = {
    // ...
  };

  const streamData = useSelector((state: RootState) => state.anime.stream);
  console.log("StreamData", streamData);
  // if (streamData.length === 0) {
  //   return <div>Loading...</div>;
  // }

  // const videoLink =
  //   "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

  useEffect(() => {
    if (Object.keys(streamData).length > 0) {
      setLoading(false);
      console.log("inside effect");
      setVideoLink(streamData.sources[0].file);
    }
  }, [streamData, videoLink]);

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
