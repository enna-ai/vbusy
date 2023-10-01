"use client";

import React from "react";
import { Tasks } from "@/components/Tasks";
import { Header } from "@/components/Header";
import withAuth from "@/components/withAuth";
import moment from "moment";
import styles from "@/styles/modules/profile.module.scss";

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