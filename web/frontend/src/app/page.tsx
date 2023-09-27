"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Tasks } from "@/components/Tasks";
import axios from "axios";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/users/logout");
      console.log("Successfully logged out!");
      localStorage.removeItem("userInfo");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out user", error);
    }
  };

  return (
    <React.Fragment>
      <main>
        <div>
          <h1>Task List</h1>
          <Tasks />
          <button onClick={handleLogout}>Log Out</button>
          <button>Settings</button>
        </div>
      </main>
    </React.Fragment>
  )
}

export default page;