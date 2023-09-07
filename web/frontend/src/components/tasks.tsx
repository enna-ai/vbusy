"use client";

import React, { useState, useEffect } from "react";
import { TaskItem } from "./taskItem";
import { Task } from "@/interfaces/task";
import TaskAPI from "../../../../common/api";

const Tasks = () => {
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
    return (
        <React.Fragment>
            <ul>
                {
                    data.map((task, index) => (
                        <TaskItem
                            key={index}
                            task={task}
                        />
                    ))
                }
            </ul>
        </React.Fragment>
    )
};

export default Tasks;