import React, { useState, useRef } from "react";
import { BsFillTrash3Fill, BsPencilFill, BsFillArchiveFill } from "react-icons/bs";
import { FaCalendarTimes, FaCalendar } from "react-icons/fa";
import { TiTick, TiTimes } from "react-icons/ti";
import { Task } from "../interfaces/task";
import { TaskAPI } from "../../../../common/src/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/styles/modules/profile.module.scss";

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
    const [taskDate, setTaskDate] = useState<Date | null>(task.dueDate ? new Date(task.dueDate) : null);
    const datepickerRef = useRef<DatePicker | null>(null);

    const handleCancelEdit = async () => {
        setIsEditing(false);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await TaskAPI.deleteTask(task._id, token);
            onDelete(task._id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        try {
            const formattedDueDate = taskDate ? new Date(taskDate).toISOString().split('T')[0] : null;

            if (task.priority !== taskPriority) {
                const token = localStorage.getItem('token');
                const updatedPriority = await TaskAPI.updateTaskPriority(
                    task._id,
                    taskPriority,
                    token
                );
                setTaskPriority(updatedPriority.priority);
            }

            if (task.dueDate !== formattedDueDate) {
                const token = localStorage.getItem('token');
                const updatedDueDate = await TaskAPI.updateTaskDueDate(
                    task._id,
                    formattedDueDate,
                    token
                );
                setTaskDate(updatedDueDate.dueDate ? new Date(updatedDueDate.dueDate) : null);
            }

            const token = localStorage.getItem('token');
            const updatedTask = await TaskAPI.updateTask(task._id, edit, token);
            setEdit(updatedTask.task);

            setIsEditing(false);
            onUpdate(updatedTask);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCompleted = async () => {
        try {
            const token = localStorage.getItem("token");
            const completedTask = !completed;
            setCompleted(completedTask);

            await TaskAPI.completeTask(task._id, token);

            onUpdate({ ...task, completed: completedTask });
        } catch (error) {
            console.error(error);
        }
    };

    const handleArchive = async () => {
        try {
            const token = localStorage.getItem("token");
            const archivedTask = !archived;

            onUpdate({ ...task, archived: archivedTask });
            setArchived(archivedTask);

            await TaskAPI.archiveTask(task._id, token);
        } catch (error) {
            console.error(error);
        }
    };

    const formatDueDate = (date: Date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        return formattedDate;
    };

    const toggleCalendar = () => {
        if (datepickerRef.current) {
            datepickerRef.current.setOpen(true);
        }
    };

    const priorityColors = {
        low: "#a6da95",
        medium: "#f5a97f",
        high: "#ed8796",
    } as any;

    return (
        <>
            <li className={styles.taskItem}>
                {isEditing ? (
                    <div className={styles.taskEditContentContainer}>
                        <div className={styles.taskEditContentItem}>
                            <input
                                className={styles.editTaskForm}
                                type="text"
                                value={edit}
                                onChange={(e) => setEdit(e.target.value)}
                            />
                        </div>
                        <div className={styles.taskEditButtons}>
                            <span className={styles.priorityFormContainer}>
                                <select className={styles.editPriorityForm} id="priority" name="priority" defaultValue={task.priority} onChange={(e) => setTaskPriority(e.target.value)}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </span>
                            <label onClick={toggleCalendar} className={styles.editDateForm}>
                                <FaCalendar className={styles.dueDateIcon} />
                                <DatePicker
                                    minDate={new Date(new Date().toISOString().split("T")[0])}
                                    selected={taskDate}
                                    dateFormat="yyyy-MM-dd"
                                    onChange={(date) => {
                                        setTaskDate(date);
                                    }}
                                    ref={(ref) => (datepickerRef.current = ref)}
                                    className={styles.inputDateForm}
                                />
                            </label>
                            <button className={styles.confirmButton} onClick={handleUpdate}><TiTick /></button>
                            <button className={styles.cancelButton} onClick={handleCancelEdit}><TiTimes /></button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.taskContentContainer}>
                        <div className={styles.taskContent}>
                            <div className={styles.taskContentItem}>
                                <label className={styles.taskCheckbox}>
                                    <input
                                        type="checkbox"
                                        checked={completed}
                                        onChange={handleCompleted}
                                    />
                                </label>
                                <p className={`${completed ? "completed" : ""} ${styles.taskItemContent}`}>{edit}</p>
                            </div>
                            <div className={styles.taskContentManage}>
                                <div className={styles.taskContentInfo}>
                                    <span className={styles.taskDueDate}>
                                        {task.dueDate && (
                                            <span className={styles.taskDueDateContent}><FaCalendarTimes className={styles.calendarIcon} /> {formatDueDate(task.dueDate)}</span>
                                        )}
                                    </span>
                                    <span className={styles.taskPriority}>
                                        <span className={styles.priorityLevelDot} style={{ background: priorityColors[task.priority] }}></span>
                                        <span>{task.priority}</span>
                                    </span>
                                </div>
                                <div className={styles.taskButtons}>
                                    <button onClick={handleDelete} className={styles.icon}><BsFillTrash3Fill /></button>
                                    <button onClick={() => setIsEditing(true)} className={styles.icon}><BsPencilFill /></button>
                                    <button onClick={handleArchive} className={styles.icon}><BsFillArchiveFill /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </li>
        </>
    )
};