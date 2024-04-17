'use client';

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { createContext } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    signIn: (token: string) => void;
    signOut: () => void;
    recoveryToken: () => string | undefined;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    
    var isAuthenticated = !!recoveryToken();
    const router = useRouter();

    function signIn(token: string) {
        setCookie("coffre.token", token, {
            maxAge: 60 * 60,
        });
    }

    function signOut() {
        deleteCookie("coffre.token");
        router.push("/");
    }

    function recoveryToken() {
        const cookie = getCookie("coffre.token");
        const token = cookie?.toString();
        return token;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, recoveryToken }}>
            {children}
        </AuthContext.Provider>
    )
}