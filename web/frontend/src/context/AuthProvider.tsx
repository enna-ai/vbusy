"use client";

import { createContext, useState, useContext } from "react";

type AuthProviderProps = {
    children: React.ReactNode;
};

type User = {
    email: string;
    password: string;
};

interface AuthContextType {
    user: User | null;
    setUser: (email: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
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