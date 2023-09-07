import React, { useState } from "react";
import { BsFillTrash3Fill, BsPencilFill, BsCalendar, BsThermometerLow, BsFillArchiveFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import day from "dayjs";
import { Task } from "../interfaces/task";
import TaskAPI from "../../../../common/api";

interface TaskItemProps {
    task: Task;
    onDelete: (taskId: string) => void;
    onUpdate: (updatedTask: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate }) => {
    const [edit, setEdit] = useState(task.task);
    const [isEditing, setIsEditing] = useState(false);
    const [completed, setCompleted] = useState(task.completed);
    const [archived, setArchived] = useState(task.archived);
    const [taskPriority, setTaskPriority] = useState(task.priority);
    const [taskDate, setTaskDate] = useState(task.dueDate);

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
            if (task.priority !== taskPriority) {
                const updatedPriority = await TaskAPI.updateTaskPriority(task._id, taskPriority);
                setTaskPriority(updatedPriority.priority);
            }

            if (task.dueDate !== taskDate) {
                const updatedDueDate = await TaskAPI.updateTaskDueDate(task._id, taskDate);
                setTaskDate(updatedDueDate.dueDate);
            }

            const updatedTask = await TaskAPI.updateTask(task._id, edit);
            setEdit(updatedTask.task);

            setIsEditing(false);
            onUpdate(updatedTask);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCompleted = async () => {
        try {
            const completedTask = !completed;
            setCompleted(completedTask);

            await TaskAPI.completeTask(task._id);

            onUpdate({ ...task, completed: completedTask });
        } catch (error) {
            console.error(error);
        }
    };

    const handleArchive = async () => {
        try {
            const archivedTask = !archived;
            setArchived(archivedTask);

            await TaskAPI.archiveTask(task._id);

            onUpdate({ ...task, archived: archivedTask });
        } catch (error) {
            console.error(error);
        }
    }

    const formatDueDate = (date: Date) => {
        return day(date).format("ddd MMM DD");
    }

    return (
        <React.Fragment>
            <li className={completed ? "completed" : ""}>
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={edit}
                            onChange={(e) => setEdit(e.target.value)}
                        />
                        <span>
                            <BsCalendar />
                            <select id="priority" name="priority" defaultValue={task.priority} onChange={(e) => setTaskPriority(e.target.value)}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </span>
                        <span>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={isEditing ? (task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "") : ""}
                                onChange={(e) => setTaskDate(e.target.value ? day(e.target.value).toDate() : null)}
                            />
                        </span>
                        <button onClick={handleUpdate}><TiTick /></button>
                    </div>
                ) : (
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={handleCompleted}
                            />
                        </label>
                        <p>{edit}</p>
                        <span>
                            <BsCalendar />
                            {task.dueDate && (
                                <span>{formatDueDate(task.dueDate)}</span>
                            )}
                        </span>
                        <span>
                            <BsThermometerLow />
                            <span>Priority: {task.priority}</span>
                        </span>
                        <button onClick={handleDelete}><BsFillTrash3Fill /></button>
                        <button onClick={() => setIsEditing(true)}><BsPencilFill /></button>
                        <button onClick={handleArchive}><BsFillArchiveFill /></button>
                    </div>
                )}
            </li>
        </React.Fragment>
    )
};