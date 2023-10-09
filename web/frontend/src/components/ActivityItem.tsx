import React from "react";
import { RecentActivities } from "@/interfaces/activity";
import { IconType } from "react-icons";
import { AiOutlinePlusCircle, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { HiOutlineArchiveBox, HiOutlineTrash } from "react-icons/hi2";
import styles from "@/styles/modules/activity.module.scss";

const ActivityItem: React.FC<RecentActivities> = ({ activity, description, task, timestamp }) => {
    const formatTimestamp = (timestamp: Date) => {
        const now = new Date();
        const time = new Date(timestamp);
        const timeDifference = now.getTime() - time.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        if (days >= 7) {
          const options = { year: "numeric", month: "short", day: "numeric" };
          return time.toLocaleDateString(undefined, options);
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

    const getActivityIcon = (activity: string): IconType => {
        switch (activity) {
            case "delete":
                return AiOutlineDelete;
            case "create":
                return AiOutlinePlusCircle;
            case "update":
                return AiOutlineEdit;
            case "archive":
                return HiOutlineArchiveBox;
            case "purge":
                return HiOutlineTrash;
            default:
                return AiOutlinePlusCircle;
        }
    };

    const Icon = getActivityIcon(activity);

    const priorityColors = {
        create: "#a6da95",
        update: "#f5a97f",
        delete: "#ed8796",
        purge: "#ed8796",
        archive: "#7dc4e4",
    } as any;

    return (
        <div className={styles.activityItem}>
            <div className={styles.activityIcon} style={{ background: priorityColors[activity] }}>
                <Icon className={styles.icon} />
            </div>
            <div className={styles.activityContent}>
                <p className={styles.activityDescription}>{description} <span className={styles.highlight}>{task}</span></p>
                <p className={styles.activityTimestamp}>{formatTimestamp(timestamp)}</p>
            </div>
        </div>
    )
};

export default ActivityItem;