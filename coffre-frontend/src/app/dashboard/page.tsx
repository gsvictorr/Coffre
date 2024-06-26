'use client';

import CurrentPage from "@/components/reusable/current-page";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";


export default function Dashboard(){
    const today = new Date();

    const formatDate = (today:Date) => {
        const day = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const { user } = useContext(AuthContext);

    return(
        <>
            <CurrentPage path={"dashboard"} name={"Dashboard"}></CurrentPage>
            <h1 className="text-2xl">Seja bem-vindo(a), {user?.name}!</h1>
            <p className="text-sm">Exibindo atualizações de {formatDate(today)}</p>
        </>
    );
}