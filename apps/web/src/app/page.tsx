"use client";

import moment from "moment";
import React from "react";
import { Header } from "../components/Header";
import { Tasks } from "../components/Tasks";
import withAuth from "../components/withAuth";
import styles from "../styles/modules/profile.module.scss";

const page = () => {
  const data = localStorage.getItem("userInfo");
  const userInfo = data ? JSON.parse(data) : {};

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div>
          <h1>Welcome, {userInfo.username}! 🐝</h1>
          <p>{moment().format("[Today,] ddd DD MMM YYYY")}</p>
          <Tasks />
        </div>
      </main>
    </>
  )
}

export default withAuth(page);
