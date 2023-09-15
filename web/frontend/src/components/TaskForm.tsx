"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TaskAPI } from "../../../../common/src/index";
import { Task } from "../interfaces/task";

interface FormValues {
    task: string;
    priority: string;
    dueDate: string;
}

interface TaskFormProps {
    tasks: (newTask: Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ tasks }) => {
    const initialValues: FormValues = {
        task: "",
        priority: "low",
        dueDate: "",
    };

    const handleNewTask = async (values: FormValues) => {
        try {
            const token = localStorage.getItem("token");
            const newTask = await TaskAPI.createTask(values.task, values.priority, values.dueDate, token);
            tasks(newTask);

            values.task = "";
            values.dueDate = "";
            values.priority = "";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <React.Fragment>
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
                <Form className="task-form">
                    <Field id="task" name="task" placeholder="Add New Task" />
                    <Field as="select" id="priority" name="priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </Field>
                    <Field type="date" id="dueDate" name="dueDate" min={new Date().toISOString().split("T")[0]} />
                    <button type="submit">+</button>
                </Form>
            </Formik>
        </React.Fragment>
    )
};