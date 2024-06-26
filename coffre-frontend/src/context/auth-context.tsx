'use client';

import { frontendAPI } from "@/lib/api";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

type UserType = {
    name: string;
    email: string;
    userRole: string;
};

type AuthContextType = {
    user: UserType | null;
    isAuthenticated: boolean;
    signIn: (token: string) => void;
    signOut: () => void;
    recoveryToken: () => string | undefined;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);

    var isAuthenticated = !!recoveryToken();
    const router = useRouter();

    useEffect(() => {
        const token = recoveryToken();
        if (token) {
            fetchUserInfo(token).then(userInfo => {
                setUser(userInfo);
            });
        } 
    }, []);

    function signIn(token: string) {
        setCookie("coffre.token", token, {
            maxAge: 60 * 60,
        });
        fetchUserInfo(token).then(userInfo => {
            setUser(userInfo);
            isAuthenticated = true;
        });
    }

    function signOut() {
        deleteCookie("coffre.token");
        setUser(null);
        isAuthenticated = false;
        router.push("/");
    }

    function recoveryToken() {
        const cookie = getCookie("coffre.token");
        const token = cookie?.toString();
        return token;
    }

    async function fetchUserInfo(token: string): Promise<UserType | null> {
        try {
            const response = await frontendAPI.get("/user/info", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { name, email, userRole } = response.data;
            return { name, email, userRole };
        } catch (error) {
            console.error("Erro ao obter informações do usuário:", error);
            return null;
        }
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, signIn, signOut, recoveryToken }}>
            {children}
        </AuthContext.Provider>
    )
}