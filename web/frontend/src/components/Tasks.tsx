"use client";

import React, { useState, useEffect } from "react";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";
import { Task } from "@/interfaces/task";
import { FILTER_ALL, FILTER_ARCHIVED, FILTER_COMPLETED } from "@/utils/consts";
import axios from "axios";
import styles from "@/styles/modules/profile.module.scss";

export const Tasks: React.FC<{}> = () => {
    const [data, setData] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Task[]>(data);

    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const tasks = response.data;
            const filteredTasks = tasks.filter((task: any) => !task.archive);

            setData(tasks);
            setFilter(filteredTasks);
        } catch (error) {
            console.error("Error fetching user profile", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const taskList = (newTask: Task) => {
        setData((prev) => [...prev, newTask]);
        fetchData();
    };

    const filterTasks = (status: string) => {
        let filteredTasks: Task[] = [];

        switch (status) {
            case FILTER_ALL:
                filteredTasks = data.filter((task) => !task.archived);
                break;
            case FILTER_COMPLETED:
                filteredTasks = data.filter((task) => task.completed);
                break;
            case FILTER_ARCHIVED:
                filteredTasks = data.filter((task) => task.archived);
                break;
            default:
                filteredTasks = data;
        }

        setFilter(filteredTasks);
    };

    const deleteTask = (taskId: string) => {
        setData((prev) => prev.filter((task) => task._id !== taskId));
        fetchData();
    };

    const updateTask = (updatedTask: Task) => {
        const updatedTaskIndex = data.findIndex((task) => task._id === updatedTask._id);
        if (updatedTaskIndex !== -1) {
            const updatedData = [...data];
            updatedData[updatedTaskIndex] = updatedTask;

            setData(updatedData);
            fetchData();
        }
    };

    const purgeTasks = async () => {
        try {
            const userId = localStorage.getItem("userId");

            await axios.delete(`http://localhost:4000/api/v1/tasks/${userId}/purge`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const response = await axios.get("http://localhost:4000/api/v1/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const updatedTaskList = response.data;

            setData(updatedTaskList);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <TaskForm tasks={taskList} />
            <div className={styles.filterTasks}>
                <button onClick={() => filterTasks("All")}>
                    <span className={styles.taskFilterText}>All</span>
                    <span className={styles.highlight}>{data.filter(task => !task.archived).length}</span>
                </button>
                <span className={styles.taskFilterDivider}></span>
                <button onClick={() => filterTasks("Completed")}>Completed <span className={styles.highlight}>{data.filter(task => task.completed === true).length}</span></button>
                <button onClick={() => filterTasks("Archived")}>Archived <span className={styles.highlight}>{data.filter(task => task.archived === true).length}</span></button>
                <button onClick={purgeTasks} className={styles.purgeTasks}>Purge All</button>
            </div>

            <ul className={styles.taskList}>
                {
                    filter.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onDelete={deleteTask}
                            onUpdate={updateTask}
                        />
                    ))
                }
            </ul>
        </>
    )
};