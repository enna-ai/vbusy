"user client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [buttonDisable, setButtonDisable] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user]);

    const handleRegister = async () => {
        try {
            const response = await axios.post("/api/v1/users/register", user);
            console.log("Registered user!", response.data);
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            router.push("/login");
        } catch (error) {
            console.error("Error registering user", user);
        }
    };
    
    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button onClick={handleRegister}>{buttonDisable ? "Fill out form!" : "Sign Up"}</button>

            <p>Already have an account?</p>
            <Link href="/login">Login</Link>
        </React.Fragment>
    )
}

export default SignUpPage;