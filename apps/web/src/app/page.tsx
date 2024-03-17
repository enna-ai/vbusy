"use client";

import moment from "moment";
import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import { Tasks } from "../components/Tasks";
import withAuth from "../components/withAuth";
import styles from "../styles/modules/profile.module.scss";

interface User {
  username: string;
  onboarded: boolean;
}

const page = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    const storedUser = data ? JSON.parse(data) : {};
    setUserInfo(storedUser);

    if (!storedUser.onboarded) {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, onboarded: true }));
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div>
          <h1>Welcome, {userInfo?.username}! 🐝</h1>
          <p>{moment().format("[Today,] ddd DD MMM YYYY")}</p>
          <Tasks />
        </div>
      </main>

      {showModal && (
        <div className={`${styles.modal} ${!showModal ? styles.hidden : ""}`}>
          <Modal onCloseModal={handleCloseModal} />
        </div>
      )}
    </>
  )
}

export default withAuth(page);
