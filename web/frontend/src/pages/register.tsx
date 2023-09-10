"user client";

import React from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        } catch (error) {
            console.error("Error registering user", error);
        }
    };
    
    return (
        <React.Fragment>
            <Formik
                initialValues={initialValues}
                onSubmit={handleRegister}
                validationSchema={Yup.object({
                    username: Yup.string().required("Username is required"),
                    email: Yup.string().required("Email address is required"),
                    password: Yup.string().required("Password is required")
                })}
            >
                <Form>
                    <Field type="text" id="username" name="username" placeholder="Username" minLength={2} maxLength={16} />
                    <Field type="email" id="email" name="email" placeholder="Email" />
                    <Field type="password" id="password" name="password" placeholder="Password" minLength={8} maxLength={24} />
                    <button type="submit">Sign Up</button>
                </Form>
            </Formik>

            <p>Already have an account? <Link href="/login">Login</Link></p>
        </React.Fragment>
    )
}

export default SignUpPage;