
import Sidebar from "@/components/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Coffre | Usuários",
    description: "Sua chave para o controle eficiente!"
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="md:ml-64 md:p-4 mt-16 md:mt-0">
            <Sidebar></Sidebar>
                {children}
            </div>
        </>
    )
}