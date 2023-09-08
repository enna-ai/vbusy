"use client";

import React, { useState, useEffect } from "react";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";
import { Task } from "@/interfaces/task";
import TaskAPI from "../../../../common/api";

export const Tasks: React.FC<{}> = () => {
    const [data, setData] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Task[]>(data);

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

    useEffect(() => {
        const filterAll = data.filter((task) => task.archived === false);
        setFilter(filterAll);
    }, [data]);

    const taskList = (newTask: Task) => {
        setData((prev) => [...prev, newTask]);
    };

    const filterTasks = (status: string) => {
        if (status === "All") {
            const filterAll = data.filter((task) => task.archived === false);
            setFilter(filterAll);
        } else if (status === "Completed") {
            const completedTasks = data.filter((task) => task.completed === true);
            setFilter(completedTasks);
        } else if (status === "Archived") {
            const archivedTasks = data.filter((task) => task.archived === true);
            setFilter(archivedTasks);
        }
    };

    const deleteTask = (taskId: string) => {
        setData((prev) => prev.filter((task) => task._id !== taskId));
    };

    const updateTask = (updatedTask: Task) => {
        const updatedTaskIndex = data.findIndex((task) => task._id === updatedTask._id);
        if (updatedTaskIndex !== -1) {
            const updatedData = [...data];
            updatedData[updatedTaskIndex] = updatedTask;

            setData(updatedData);
        }
    };

    const purgeTasks = async () => {
        try {
            await TaskAPI.purgeTasks();

            const updatedTaskList = await TaskAPI.getTasks();
            setData(updatedTaskList);
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
                    filter.map((task, index) => (
                        <TaskItem
                            key={index}
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