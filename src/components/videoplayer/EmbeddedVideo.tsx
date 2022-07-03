import React from "react";
import { Embed } from "@vime/react";

function EmbeddedVideo() {
  const onMessage = (event: CustomEvent<any>) => {
    const message = event.detail;
    // ...
  };

  return (
    <Embed
      embedSrc="https://www.youtube-nocookie.com/embed/DyTCOwB0DVw"
      params={{ autoplay: 1, muted: 1, controls: 1 }}
      mediaTitle="Agent 327: Operation Barbershop"
      origin="https://www.youtube-nocookie.com"
      onVmEmbedMessage={onMessage}
    />
  );
}
export default EmbeddedVideo;
