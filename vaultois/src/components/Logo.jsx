import React from "react";

const Logo = ({height=40}) => {
  return (
    <div className="font-bold text-xl text-white flex justify-center" style={{height: `${height}px`}}>
      <img src="./icons/vaultois_logo.png" alt="Vaultois logo" />
    </div>
  );
};

export default Logo;
