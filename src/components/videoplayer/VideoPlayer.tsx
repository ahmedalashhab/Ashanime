import React from "react";
import { Player, Video } from "@vime/react";

const VideoPlayer = () => {
  return (
    <Player controls>
      <Video crossOrigin="" poster="https://media.vimejs.com/poster.png">
        {/* These are passed directly to the underlying HTML5 `<video>` element. */}
        {/* Why `data-src`? Lazy loading, you can always use `src` if you prefer.  */}
        <source data-src="https://media.vimejs.com/720p.mp4" type="video/mp4" />
        <track
          default
          kind="subtitles"
          src="https://ssbstream.net/e/84ob4f649y3j"
          srcLang="jp"
          label="Japanese"
        />
      </Video>

      {/* ... */}
    </Player>
  );
};

export default VideoPlayer;
