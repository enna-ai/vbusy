"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

const withAuth = (Component: React.FC) => {
    const Auth: React.FC = (props) => {
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const checkAuthentication = async () => {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login");
                } else {
                    const isAuthenticated = true;
                    if (!isAuthenticated) {
                        router.push("/login");
                    } else {
                        setIsLoading(false);
                    }
                }
            };

            checkAuthentication();
        }, [router]);

        return isLoading ? (
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#fce2ae"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}
                visible={true}
            />
        ) : (
            <Component {...props} />
        );
    };

    return Auth;
};

export default withAuth;