"use client";

import { createContext, useState, useContext } from "react";

type AuthProviderProps = {
    children: React.ReactNode;
};

type Email = {
    email: string;
    password: string;
};

interface AuthContextType {
    email: Email | null;
    setEmail: (email: Email | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
}: AuthProviderProps) => {
    const [email, setEmail] = useState<Email | null>(null);

    return (
        <AuthContext.Provider value={{ email, setEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthProvider Error");
    }

    return context;
};