"use client";

import React from "react";
import { Header } from "@/components/Header";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import withAuth from "@/components/withAuth";
import styles from "@/styles/modules/settings.module.scss";

interface FormValues {
    email: string;
    username: string;
}

const SettingsPage: React.FC = () => {
    const initialValues: FormValues = {
        email: "",
        username: "",
    };

    const data = localStorage.getItem("userInfo");
    const userInfo = data ? JSON.parse(data) : {};
    const { username, email } = userInfo;

    const handleUpdate = async (values: FormValues) => {
        try {
            const response = await axios.patch("http://localhost:4000/api/v1/user/settings", values);
            const { username, email } = response.data;
            localStorage.setItem("userInfo", JSON.stringify({ username, email }));
            
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                toast.error(error.response.data.error, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                console.error("Error editing user:", error.response);
            }
        }
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                
            </main>
        </>
    )
}

export default withAuth(SettingsPage);