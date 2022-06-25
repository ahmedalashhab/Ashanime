import React from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { useEffect } from "react";

const Tooltip = ({ children, text }: any) => {
  useEffect(() => {
    tippy(".tooltip", {
      arrow: true,
      animation: "scale",
      theme: "dark",
      placement: "left",
      interactive: true,
      content: text,
    });
  }, [text]);

  return <span className="tooltip">{children}</span>;
};

export default Tooltip;
