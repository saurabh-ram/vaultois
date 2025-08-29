import React from "react";

const GitHubButton = () => {
  const handleClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="flex gap-1.5 sm:gap-2 items-center bg-black rounded-full px-1"
      style={{ cursor: "pointer" }}
      onClick={() => {handleClick("https://github.com/saurabh-ram")}}
    >
      <img
        className="invert h-10 sm:h-12 py-1"
        src="/icons/github.svg"
        alt="GitHub logo"
      />
      <span className="text-white text-[12px] sm:text-[16px] pr-4 font-bold">
        GitHub
      </span>
    </div>
  );
};

export default GitHubButton;
