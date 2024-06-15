import type React from "react";
import Link from "next/link";
import { PiGithubLogoFill, PiGlobeHemisphereWestFill } from "react-icons/pi";

const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; All Rights Reserved</p>
      <div className="icons">
        <Link
          href="https://github.com/vbusy"
          aria-label="Github Repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PiGithubLogoFill style={{ fontSize: "22" }} />
        </Link>
        <Link
          href="https://vbusy.vercel.app"
          aria-label="Vbusy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PiGlobeHemisphereWestFill style={{ fontSize: "22" }} />
        </Link>
      </div>
    </footer>
  )
};

export default Footer;
