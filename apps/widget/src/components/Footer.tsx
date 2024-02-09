import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer>
            &copy; enna-ai&nbsp;•&nbsp;<Link href="https://github.com/enna-ai/vbusy" target="_blank" rel="noopener noreferrer">src</Link>
        </footer>
    )
};

export default Footer;
