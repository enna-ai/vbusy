import Layout from "@/app/layout";
import React from "react";
import { useRouter } from "next/router";
import { Tasks } from "@/components/Tasks";
import axios from "axios";

const ProfilePage: React.FC = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:4000/api/v1/users/logout");
            console.log("Successfully logged out!");
            localStorage.removeItem("userInfo");
            router.push("/");
        } catch (error) {
            console.error("Error logging out user", error);
        }
    };

    return (
        <Layout>
            <h1>Task List</h1>
            <Tasks />
            <button onClick={handleLogout}>Log Out</button>
            <button>Settings</button>
        </Layout>
    )
};

export default ProfilePage;