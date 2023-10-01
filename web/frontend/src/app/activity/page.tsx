"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Activity } from "@/interfaces/activity";
import { BsPatchMinusFill, BsPatchPlusFill, BsPatchExclamationFill, BsPatchCheckFill } from "react-icons/bs";
import axios from "axios";
import moment from "moment";
import withAuth from "@/components/withAuth";
import styles from "@/styles/modules/activity.module.scss";

type ActivityItem = {
    action: "delete" | "create" | "update" | "purge" | "archive";
    description: string;
    timestamp: Date;
}

const ActivityPage: React.FC = () => {
    const [data, setData] = useState<Activity[]>([]);

    const handleData = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = localStorage.getItem("userInfo");
            const userInfo = data ? JSON.parse(data) : {};

            const response = await axios.get(`http://localhost:4000/api/v1/activity/${userInfo._id}`, {
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

    const formatTimestamp = (timestamp: Date) => {
        const now = new Date();
        const time = new Date(timestamp);
        const timeDifference = now.getTime() - time.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        if (days >= 7) {
          return timestamp.toLocaleDateString();
        } else if (days > 0) {
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
          return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    };

    const actionIcons = {
        delete: BsPatchMinusFill,
        create: BsPatchPlusFill,
        update: BsPatchExclamationFill,
        purge: BsPatchCheckFill,
    };

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
                                        <li key={index} className={styles.activityItem}>
                                            <span className={styles.actionIcon}>
                                                {React.createElement(actionIcons[item.action])}
                                            </span>
                                            {item.description}
                                        </li>
                                        <p className={styles.activityTimestamp}>{formatTimestamp(item.timestamp)}</p>
                                    </div>
                                ))
                            }
                        </ul>
                    ))
                }
            </main>
        </>
    )
}

export default withAuth(ActivityPage);