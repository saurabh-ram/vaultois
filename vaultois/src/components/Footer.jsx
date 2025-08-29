import { useEffect } from "react";
import Logo from "./Logo.jsx";
import { useHeight } from "../../context/heightContext.js";

const Footer = () => {

    const { footerHeight, setFooterHeight } = useHeight();

    useEffect(() => {
        // Measure height of the navbar after it mounts
        const footer = document.getElementById("footer");
        footer.offsetHeight != footerHeight && setFooterHeight(footer.offsetHeight);
    }, [footerHeight]);
    
    
    return (
        <footer id="footer">
            <div className="w-full bg-blue-300 flex justify-center">
                <div className="min-w-10/12 my-8">
                    <div className="w-[max(125px,20%)] flex flex-row-reverse justify-end">
                        <Logo />
                    </div>
                    <div className="my-12">
                        <ul className="grid gap-3 box-border [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="/in-development">FAQ</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="/in-development">Help Centre</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="/in-development">Privacy</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="/in-development">Jobs</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="/in-development">Cookie Preferences</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="/in-development">Terms of Use</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="/about">About Us</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="/contact">Contact Us</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="https://freedns.afraid.org/">Free DNS</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="https://github.com/saurabh-ram">GitHub</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="https://saurabh-ram.github.io/saurabh-portfolio/">My Portfolio</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="https://saurabhram.blogspot.com/">Review Site</a></li>
                            <li className="list-none"><a className="text-decoration grey-text" target="_blank" href="https://www.linkedin.com/in/saurabh-ram-312b371b3/">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div className="copyright-text footer-text grey-text">© Saurabh Ram. All rights reserved.</div>
                </div>
            </div>
        </footer>
  );
};

export default Footer;
