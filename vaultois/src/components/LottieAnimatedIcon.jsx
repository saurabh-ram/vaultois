import React, { useState, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottieAnimatedIcon = ({onClick, ...props}) => {
  const [dotLottie, setDotLottie] = useState(null);

  return (
    <div
      style={{ width: props.width, height: props.height, cursor: "pointer" }}
      onClick={onClick}
    >
      <DotLottieReact
        src={props.src}
        dotLottieRefCallback={setDotLottie}
        onMouseEnter={() => dotLottie?.play()}
        // onMouseLeave={() => dotLottie?.reset()} // loop={props.loop}
        // autoplay={props.autoplay}
        width={1}
        height={1}
      />
    </div>
  );
};

export default LottieAnimatedIcon;
