import React from "react";
import Link from "next/link";

export const Header: React.FC = () => {
    return (
        <React.Fragment>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </nav>
        </React.Fragment>
    )
};