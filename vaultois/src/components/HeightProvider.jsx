import { useState } from "react";
import HeightContext from "../../context/heightContext.js";

const HeightProvider = ({ children }) => {
  const DEFAULT_NAVBAR_HEIGHT = 64;
  const DEFAULT_FOOTER_HEIGHT = 308;
  const [navbarHeight, setNavbarHeight] = useState(DEFAULT_NAVBAR_HEIGHT);
  const [footerHeight, setFooterHeight] = useState(DEFAULT_FOOTER_HEIGHT);

  return (
    <HeightContext.Provider
      value={{ navbarHeight, footerHeight, setNavbarHeight, setFooterHeight }}
    >
      {children}
    </HeightContext.Provider>
  );
};

export default HeightProvider;
