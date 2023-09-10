"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignInPage: React.FC = () => {
    const router = useRouter();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/v1/users/login", credentials);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data._id);
            router.push("/profile");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <React.Fragment>
            <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button onClick={handleLogin}>Login</button>

            <p>Don&apos;t have an account?</p>
            <Link href="/register">Register</Link>
        </React.Fragment>
    )
};

export default SignInPage;