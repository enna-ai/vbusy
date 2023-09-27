"use client";

import React from "react";
import styles from "@/styles/modules/404.module.scss";
import Image from "next/image";
import Icon from "../../assets/bee.png";

const NotFound: React.FC = () => {
    return (
        <>
            <section className={styles.notFound}>
                <Image src={Icon} alt="bee" height={100} width={100} />
                <h1 className={styles.heading}>404 - Page Not Found</h1>
                <p><a href="/">$cd home</a></p>
            </section>
        </>
    )
};

export default NotFound;