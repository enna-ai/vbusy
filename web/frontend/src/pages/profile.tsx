"user client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tasks } from "@/components/Tasks";
import axios from "axios";

interface Task {
    _id: string;
    task: string;
}

const ProfilePage: React.FC = () => {
    const router = useRouter();
    const [data, setData] = useState<Task[]>([]);
    
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

    useEffect(() => {
        try {
            const getUserData = async () => {
                const token = localStorage.getItem("token");
                console.log(token);
                const response = await axios.get("http://localhost:4000/api/v1/users/profile", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
        
                console.log(response.data.tasks);
                setData(response.data.tasks);
            };
        
            getUserData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const displayTasks = () => {
        return (
            <>
                {
                    data.map((item) => (
                        <li key={item._id}>{item.task}</li>
                    ))
                }
            </>
        )
    };

    return (
        <React.Fragment>
            <h1>Task List</h1>
            <ul>{displayTasks()}</ul>
            <button onClick={handleLogout}>Log Out</button>
        </React.Fragment>
    )
};

export default ProfilePage;