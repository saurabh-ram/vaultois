import React, { useEffect, useRef } from "react";

const AnimatedIcon = ({
  src,
  trigger = "hover",
  height = 200,
  width = 200,
  onClick,
}) => {
  const iconRef = useRef(null);
  const defaultAttrs = JSON.stringify({
    variationThumbColour: "#536DFE",
    variationName: "Two Tone",
    variationNumber: 2,
    numberOfGroups: 2,
    backgroundIsGroup: false,
    strokeWidth: 2.5,
    defaultColours: {
      "group-1": "#8EC5FFFF",
      "group-2": "#8EC5FFFF",
      background: "#FFFFFF00",
    },
  });

  // Apply the `attributes` prop as an HTML attribute
  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.setAttribute("attributes", defaultAttrs);
    }
  }, [defaultAttrs]);

  return (
    <div
      style={{ width: 25, height: 25, cursor: "pointer" }}
      onClick={onClick}
    >
      <animated-icons
        ref={iconRef}
        src={src}
        trigger={trigger}
        height={height}
        width={width}
      ></animated-icons>
    </div>
  );
};

export default AnimatedIcon;
