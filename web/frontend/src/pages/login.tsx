import Layout from "@/app/layout";
import React from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";

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
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data._id);
            router.push("/profile");
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data.error, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                console.error("Error during login:", error.response);
            }
        }
    };

    return (
        <Layout>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleLogin}
                    validationSchema={Yup.object({
                        email: Yup.string().required("Email address is required"),
                        password: Yup.string().required("Password is required")
                    })}
                >
                    <Form className="auth login">
                        <Field type="email" id="email" name="email" placeholder="Email" />
                        <Field type="password" id="password" name="password" placeholder="Password" />
                        <button type="submit">Login</button>
                        <ToastContainer />
                    </Form>
                </Formik>

                <p>Don&apos;t have an account? <Link href="/register">Sign Up</Link></p>
            </div>
        </Layout>
    )
};

export default SignInPage;