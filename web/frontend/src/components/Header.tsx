import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BiUser, BiSolidWidget } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { RiHistoryLine } from "react-icons/ri";
import { API_BASE_URL, ENDPOINTS } from "@/utils/consts";
import BeeImage from "../../assets/bee.png";
import styles from "@/styles/modules/header.module.scss";

export const Header: React.FC = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post(`${API_BASE_URL}${ENDPOINTS.AuthLogout}`);
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
            router.push("/login");
        } catch (error) {
            console.error("Error logging out user", error);
        }
    };

    return (
        <>
            <nav className={styles.nav}>
                <div>
                    <Link href="/">
                        <Image
                            src={BeeImage}
                            alt="Bee icon"
                            height={30}
                            width={30}
                        />
                    </Link>
                </div>
                <div className={styles.links}>
                    <Link href="https://vbusy-widget.vercel.app/"><BiSolidWidget className={styles.icon} /></Link>
                    <Link href="/activity"><RiHistoryLine className={styles.icon} /></Link>
                    <Link href="/settings"><BiUser className={styles.icon} /></Link>
                    <button onClick={handleLogout}><FiLogOut className={styles.icon} /></button>
                </div>
            </nav>
        </>
    )
};