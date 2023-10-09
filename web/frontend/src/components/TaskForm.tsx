"use client";

import React, { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Task } from "../interfaces/task";
import { FaCalendar } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "@/utils/consts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/styles/modules/profile.module.scss";

interface FormValues {
    task: string;
    priority: string;
    dueDate: Date | null;
}

interface TaskFormProps {
    tasks: (newTask: Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ tasks }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const datepickerRef = useRef<DatePicker | null>(null);

    const initialValues: FormValues = {
        task: "",
        priority: "low",
        dueDate: null,
    };

    const handleNewTask = async (values: FormValues) => {
        try {
            const token = localStorage.getItem("token");
            
            const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.Task}`, {
                task: values.task,
                priority: values.priority,
                dueDate: values.dueDate,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const newTask = response.data;
            tasks(newTask);

            values.task = "";
            values.dueDate = null;
            values.priority = "";
        } catch (error) {
            console.error(error);
        }
    };

    const toggleCalendar = () => {
        if (datepickerRef.current) {
            datepickerRef.current.setOpen(true);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    handleNewTask(values);
                }}
                validationSchema={Yup.object({
                    task: Yup.string().required("Task is required"),
                    priority: Yup.string().required("Priority level is required"),
                    dueDate: Yup.date().nullable(),
                })}
            >
                <Form className={styles.taskForm}>
                    <Field className={styles.createForm} id="task" name="task" placeholder="Add New Task" required />
                    <div className={styles.formOptions}>
                        <Field className={styles.priorityForm} as="select" id="priority" name="priority">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Field>
                        <label onClick={toggleCalendar} className={styles.dateForm}>
                            <FaCalendar className={styles.dueDateIcon} />
                            <DatePicker
                                minDate={new Date(new Date().toISOString().split("T")[0])}
                                selected={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date);
                                }}
                                ref={(ref) => (datepickerRef.current = ref)}
                                className={styles.inputDateForm}
                            />
                        </label>
                        {/* <Field className={styles.dateForm} type="date" id="date" name="date" min={new Date().toISOString().split("T")[0]} /> */}
                        <button className={styles.formButton} type="submit"><TiPlus /></button>
                    </div>
                </Form>
            </Formik>
        </>
    )
};