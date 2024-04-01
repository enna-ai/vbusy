import React from "react";
import { PiGithubLogoBold, PiHashStraightBold } from "react-icons/pi";
import Link from "next/link";

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
          <PiGithubLogoBold style={{ fontSize: "22" }} />
        </Link>
        <Link
          href="https://vbusy.vercel.app"
          aria-label="Vbusy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PiHashStraightBold style={{ fontSize: "22", transform: "rotate(70deg)" }} />
        </Link>
      </div>
    </footer>
  )
};

export default Footer;
