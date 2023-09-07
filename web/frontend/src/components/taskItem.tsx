import React from "react";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import { Task } from "../interfaces/task";
import TaskAPI from "../../../../common/api";

interface TaskItemProps {
    task: Task;
    onDelete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
    const handleDelete = async () => {
        try {
            await TaskAPI.deleteTask(task._id);
            onDelete(task._id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <React.Fragment>
            <li>
                <p>{task.task}</p>
                <div>
                    <button onClick={handleDelete}><BsFillTrash3Fill /></button>
                    <button><BsPencilFill /></button>
                </div>
            </li>
        </React.Fragment>
    )
};