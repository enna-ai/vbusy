"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import BeeImage from "../../../assets/bee.png";

interface FormValues {
    username: string;
    email: string;
    password: string;
}

const SignUpPage: React.FC = () => {
    const router = useRouter();

    const initialValues: FormValues = {
        username: "",
        email: "",
        password: "",
    };

    const handleRegister = async (values: FormValues) => {
        try {
            const response = await axios.post("http://localhost:4000/api/v1/users/register", values);
            console.log("Registered user!", response.data);
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            router.push("/login");
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data.error, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                console.error("Error during signup:", error.response);
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
                                <h1>Sign Up</h1>
                                <p>Welcome to <span>Vbusy</span>! Please fill email and password to sign into your account.</p>

                                <div className="formWrap">
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={handleRegister}
                                        validationSchema={Yup.object({
                                            username: Yup.string().required("Username is required"),
                                            email: Yup.string().required("Email address is required"),
                                            password: Yup.string().required("Password is required")
                                        })}
                                    >
                                        <Form className="formInput">
                                            <Field type="text" id="username" name="username" placeholder="Username" minLength={2} maxLength={16} />
                                            <Field type="email" id="email" name="email" placeholder="Email" />
                                            <Field type="password" id="password" name="password" placeholder="Password" minLength={8} maxLength={24} />
                                            <button type="submit">Sign Up</button>
                                            <ToastContainer />
                                        </Form>
                                    </Formik>
                                </div>

                                <p className="authText">Already have an account? <Link href="/login">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage;