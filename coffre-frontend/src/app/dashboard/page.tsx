'use client';

import CurrentPage from "@/components/reusable/current-page";
import { frontendAPI } from "@/lib/api";
import { useEffect, useState } from "react";


export default function Dashboard(){
    const today = new Date();

    const formatDate = (today:Date) => {
        const day = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
      };

    
    const [nameUser, setNameUser] = useState("");

    useEffect(() => {
        const fetchName = async () => {
            try {
                const storedName = localStorage.getItem("userName");
                if (storedName) {
                    setNameUser(storedName);
                }

                const response = await frontendAPI.get("/user/info");
                const newName = response.data.name;
                const newEmail = response.data.email;
                if (storedName !== newName) {
                    setNameUser(newName);
                    localStorage.setItem("userName", newName);
                }

            } catch (error) {
                console.error("Erro ao obter o nome do usuário:", error);
            }
        };
    
        fetchName();
    }, []);

    return(
        <>
            <CurrentPage path={"dashboard"} name={"Dashboard"}></CurrentPage>
            <h1 className="text-2xl">Seja bem-vindo(a), {nameUser}!</h1>
            <p className="text-sm">Exibindo atualizações de {formatDate(today)}</p>
        </>
    );
}