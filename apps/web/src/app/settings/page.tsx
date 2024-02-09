"use client";

import axios from "axios";
import { Formik, Form, Field } from "formik";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { Header } from "../../components/Header";
import withAuth from "../../components/withAuth";
import { API_BASE_URL, ENDPOINTS } from "../../utils/consts";
import styles from "../../styles/modules/settings.module.scss";
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
    username: string;
    email: string;
    password: string;
}

const SettingsPage: React.FC = () => {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("userInfo");
    const userInfo = data ? JSON.parse(data) : {};
    const { username, email, _id } = userInfo;

    const initialValues: FormValues = {
        username: username || "",
        email: email || "",
        password: "",
    };

    const handleUpdate = async (values: FormValues) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}${ENDPOINTS.UserSettings}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { username } = response.data;
            localStorage.setItem("userInfo", JSON.stringify({ username }));
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data.error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                console.error("Error during update:", error.response);
            }
        }
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                <h2>Account Settings</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleUpdate}
                    validationSchema={Yup.object({
                        username: Yup.string().required("Username is required"),
                        password: Yup.string().required("Password is required to change your username")
                    })}
                >
                    <Form className={styles.settingsFormInput}>
                        <p className={styles.fieldHeading}>Username</p>
                        <Field className={styles.settingsUsername} name="username" placeholder={username} minLength={2} maxLength={16} required />
                        <p className={styles.fieldHeading}>Email</p>
                        <Field className={styles.settingsEmail} type="email" name="email" placeholder={email} disabled />
                        <p className={styles.fieldHeading}>Password</p>
                        <Field className={styles.settingsPassword} type="password" name="password" placeholder="Password" required />
                        <button className={styles.settingsConfirm} type="submit">Save</button>
                        <ToastContainer />
                    </Form>
                </Formik>
                <div className={styles.userIdWrapper}>
                    <BsStarFill className={styles.icon} />
                    <div>
                        User ID: <span className={styles.userId}>{_id}</span>
                    </div>
                </div>
            </main>
        </>
    )
}

export default withAuth(SettingsPage);
