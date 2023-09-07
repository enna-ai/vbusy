"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TaskAPI from "../../../../common/api";
import { Task } from "../interfaces/task";

interface FormValues {
    task: string;
}

interface TaskFormProps {
    tasks: (newTask: Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ tasks }) => {
    const initialValues: FormValues = { task: "" };

    const handleNewTask = async (values: FormValues) => {
        try {
            const newTask = await TaskAPI.createTask(values.task);
            tasks(newTask);

            values.task = "";
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
                    task: Yup.string().required("Task is required")
                })}
            >
                <Form>
                    <Field id="task" name="task" placeholder="Add New Task" />
                    <button type="submit">+</button>
                </Form>
            </Formik>
        </React.Fragment>
    )
};