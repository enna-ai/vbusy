"use client";

import React, { useState, useEffect } from "react";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./taskItem";
import { Task } from "@/interfaces/task";
import TaskAPI from "../../../../common/api";

export const Tasks: React.FC<{}> = () => {
    const [data, setData] = useState<Task[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const taskData = await TaskAPI.getTasks();
                setData(taskData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const taskList = (newTask: Task) => {
        setData((prev) => [...prev, newTask]);
    };

    const deleteTask = (taskId: string) => {
        setData((prev) => prev.filter((task) => task._id !== taskId));
    };

    return (
        <React.Fragment>
            <TaskForm tasks={taskList} />
            <ul>
                {
                    data.map((task, index) => (
                        <TaskItem
                            key={index}
                            task={task}
                            onDelete={deleteTask}
                        />
                    ))
                }
            </ul>
        </React.Fragment>
    )
};