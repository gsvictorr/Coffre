import Sidebar from "@/components/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Coffre | Estoque",
    description: "Sua chave para o controle eficiente!"
};

export default function StockLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="ml-64 p-4">
                <Sidebar></Sidebar>
                {children}
            </div>
        </>
    )
}