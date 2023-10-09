"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import ActivityItem from "@/components/ActivityItem";
import { Activity } from "@/interfaces/activity";
import { API_BASE_URL, ENDPOINTS } from "@/utils/consts";
import axios from "axios";
import withAuth from "@/components/withAuth";
import styles from "@/styles/modules/activity.module.scss";

const ActivityPage: React.FC = () => {
    const [data, setData] = useState<Activity[]>([]);

    const handleData = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = localStorage.getItem("userInfo");
            const userInfo = data ? JSON.parse(data) : {};

            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.Activity}/${userInfo._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const activityData = await response.data;
            setData(activityData);
        } catch (error: any) {
            console.error("Error fetching recent activity data:", error.message);
        }
    }

    useEffect(() => {
        handleData();
    }, []);

    return (
        <>
            <Header />
            <main className={styles.main}>
                <h2 className={styles.heading}>Recent Activity</h2>
                {
                    data.map((activityItem, index) => (
                        <ul className={styles.activityListContainer} key={index}>
                            {
                                activityItem.activities.map((item, index) => (
                                    <div className={styles.activityItemContainer}>
                                        <li key={index}>
                                            <ActivityItem activity={item.activity} description={item.description} task={item.task} timestamp={item.timestamp} />
                                        </li>
                                    </div>
                                )).reverse()
                            }
                        </ul>
                    ))
                }
            </main>
        </>
    )
}

export default withAuth(ActivityPage);