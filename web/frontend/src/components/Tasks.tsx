"use client";

import React, { useState, useEffect } from "react";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";
import { Task } from "@/interfaces/task";
import { FILTER_ALL, FILTER_ARCHIVED, FILTER_COMPLETED } from "@/utils/consts";
import { UserAPI, TaskAPI } from "../../../../common/src/index";

export const Tasks: React.FC<{}> = () => {
    const [data, setData] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Task[]>(data);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            const { tasks: profileTasks } = await UserAPI.getUserProfile(token);
            const filteredTasks = profileTasks.filter((task: any) => !task.archived);

            setData(profileTasks);
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
            const token = localStorage.getItem("token");
            await TaskAPI.purgeTasks(userId, token);

            const updatedTaskList = await TaskAPI.getTasks(token);
            setData(updatedTaskList);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <React.Fragment>
            <TaskForm tasks={taskList} />
            <div>
                <button onClick={() => filterTasks("All")}>All {data.filter(task => !task.archived).length}</button>
                <button onClick={() => filterTasks("Completed")}>Completed {data.filter(task => task.completed === true).length}</button>
                <button onClick={() => filterTasks("Archived")}>Archived {data.filter(task => task.archived === true).length}</button>
                <button onClick={purgeTasks}>Purge Tasks</button>
            </div>

            <ul>
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
        </React.Fragment>
    )
};