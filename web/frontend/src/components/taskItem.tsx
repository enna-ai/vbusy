import React, { useState } from "react";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import { Task } from "../interfaces/task";
import TaskAPI from "../../../../common/api";

interface TaskItemProps {
    task: Task;
    onDelete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
    const [edit, setEdit] = useState(task.task);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        try {
            await TaskAPI.deleteTask(task._id);
            onDelete(task._id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedTask = await TaskAPI.updateTask(task._id, edit);
            setEdit(updatedTask.task);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <React.Fragment>
            <li>
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={edit}
                            onChange={(e) => setEdit(e.target.value)}
                        />
                        <button onClick={handleUpdate}><BsPencilFill /></button>
                    </div>
                ) : (
                    <div>
                        <p>{edit}</p>
                        <button onClick={handleDelete}><BsFillTrash3Fill /></button>
                        <button onClick={() => setIsEditing(true)}><BsPencilFill /></button>
                    </div>
                )}
            </li>
        </React.Fragment>
    )
};