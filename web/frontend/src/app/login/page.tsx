"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import BeeImage from "../../../assets/bee.png";
import "@/styles/main.scss";
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
            const response = await axios.post("http://localhost:4000/api/v1/users/login", values);
            const { token, username, email, _id } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("userInfo", JSON.stringify({ username, email, _id }));
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
            <div className="authPageContainer">
                <div className="authContainer">
                    <div className="authWrap">
                        <div className="authImage">
                            <Image
                                src={BeeImage}
                                alt="bee image"
                                width={250}
                                height={250}
                            />
                        </div>
                        <div className="authFormContainer">
                            <div className="authForm">
                                <h1>Login</h1>
                                <p>Welcome to <span>Vbusy</span>! Please fill email and password to sign into your account.</p>

                                <div className="formWrap">
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={handleLogin}
                                        validationSchema={Yup.object({
                                            email: Yup.string().required("Email address is required"),
                                            password: Yup.string().required("Password is required")
                                        })}
                                    >
                                        <Form className="formInput">
                                            <Field type="email" id="email" name="email" placeholder="Email" required />
                                            <Field type="password" id="password" name="password" placeholder="Password" required />
                                            <button className="button" type="submit">Login</button>
                                            <ToastContainer />
                                        </Form>
                                    </Formik>
                                </div>

                                <p className="authText">Don&apos;t have an account? <Link href="/signup">Sign Up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SignInPage;