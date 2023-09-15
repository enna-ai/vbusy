import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "../../assets/bee.png";

export const Header: React.FC = () => {
    return (
        <React.Fragment>
            <nav>
                <div>
                    <Link href="/">
                        <Image src={Icon} height={30} width={30} alt="Bee icon" />
                    </Link>
                </div>
                <div>
                    <Link href="/">Home</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </div>
            </nav>
        </React.Fragment>
    )
};