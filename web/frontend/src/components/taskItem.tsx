import React from "react";
import { Task } from "../interfaces/task";

interface TaskItemProps {
    task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
        <React.Fragment>
            <li>
                {task.task}
            </li>
        </React.Fragment>
    )
};