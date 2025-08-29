import React, { useEffect, useRef } from "react";

const AnimatedIcon = ({
  src,
  trigger = "hover",
  height = 200,
  width = 200,
  attributes = {},
  onClick,
}) => {
  const iconRef = useRef(null);

  // Load script only once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://animatedicons.co/scripts/embed-animated-icons.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Apply the `attributes` prop as an HTML attribute
  useEffect(() => {
    if (iconRef.current && attributes && Object.keys(attributes).length > 0) {
      iconRef.current.setAttribute("attributes", JSON.stringify(attributes));
    }
  }, [attributes]);

  return (
    <div
      style={{ width: width, height: height, cursor: "pointer" }}
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
