import React from "react";
import { IconType } from "react-icons";
import { AiOutlinePlusCircle, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { HiOutlineArchiveBox, HiOutlineTrash } from "react-icons/hi2";
import { RecentActivities } from "$interfaces/activity";
import { formatTimestamp, priorityColors } from "$utils/consts";
import styles from "$styles/modules/activity.module.scss";

const ActivityItem: React.FC<RecentActivities> = ({ activity, description, task, timestamp }) => {
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
