import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthProvider";
import axios from "axios";
import { BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import BeeImage from "../../assets/bee.png";
import styles from "@/styles/modules/header.module.scss";

export const Header: React.FC = () => {
    const { setUser } = useAuthContext();

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:4000/api/v1/users/logout");
            console.log("Successfully logged out!");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Error logging out user", error);
        }
    };

    return (
        <>
            <nav className={styles.nav}>
                <div>
                    <Image
                        src={BeeImage}
                        alt="Bee icon"
                        height={30}
                        width={30}
                    />
                </div>
                <div className={styles.links}>
                    <Link href="/settings"><BiUser className={styles.icon} /></Link>
                    <button onClick={handleLogout}><FiLogOut className={styles.icon} /></button>
                </div>
            </nav>
        </>
    )
};