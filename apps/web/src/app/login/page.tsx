"use client";

import axios from "axios";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import BeeImage from "../../../public/bee.png";
import { API_BASE_URL, ENDPOINTS } from "../../utils/consts";
import styles from "../../styles/modules/auth.module.scss";
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
    email: string;
    password: string;
}

const SignInPage: React.FC = () => {
    const router = useRouter();

    const initialValues: FormValues = {
        email: "",
        password: "",
    };

    const handleLogin = async (values: FormValues) => {
        try {
            const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.AuthLogin}`, values);
            const { token, username, email, _id, bio, pronouns, onboarded } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("userInfo", JSON.stringify({ username, email, _id, bio, pronouns, onboarded }));
            router.push("/");
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
            } else {
                console.error("Error during login:", error.response);
            }
        }
    };

    return (
        <>
            <div className={styles.authPageContainer}>
                <div className={styles.authContainer}>
                    <div className={styles.authWrap}>
                        <div className={styles.authImage}>
                            <Image
                                src={BeeImage}
                                alt="bee image"
                                width={250}
                                height={250}
                            />
                        </div>
                        <div className={styles.authFormContainer}>
                            <div className={styles.authForm}>
                                <h1>Login</h1>
                                <p>Welcome to <span>Vbusy</span>! Please fill email and password to sign into your account.</p>

                                <div className={styles.formWrap}>
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={handleLogin}
                                        validationSchema={Yup.object({
                                            email: Yup.string().required("Email address is required"),
                                            password: Yup.string().required("Password is required")
                                        })}
                                    >
                                        <Form className={styles.formInput}>
                                            <Field type="email" id="email" name="email" placeholder="Email" required />
                                            <Field type="password" id="password" name="password" placeholder="Password" required />
                                            <button className={styles.button} type="submit">Login</button>
                                            <ToastContainer />
                                        </Form>
                                    </Formik>
                                </div>

                                <p className={styles.authText}>Don&apos;t have an account? <Link href="/signup">Sign Up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SignInPage;
