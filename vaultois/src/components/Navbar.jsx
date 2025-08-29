import { useEffect } from "react";
import Logo from "./Logo.jsx";
import { useHeight } from "../../context/heightContext.js";
import GitHubButton from "./GitHubButton.jsx";

const Navbar = () => {
  const { navbarHeight, setNavbarHeight } = useHeight();

  useEffect(() => {
    // Measure height of the navbar after it mounts
    const navbar = document.getElementById("navbar");
    navbar.offsetHeight != navbarHeight && setNavbarHeight(navbar.offsetHeight);
  }, [navbarHeight]);

  return (
    <nav
      id="navbar"
      className="bg-blue-300 flex justify-between items-center px-4 sm:px-8 md:pr-12"
    >
      <div className="logo m-0 sm:m-2.5 logo-margin">
        <Logo />
      </div>
      <div className="py-3 sm:py-2">
        <GitHubButton />
      </div>
    </nav>
  );
};

export default Navbar;
