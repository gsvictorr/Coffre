'use client';

import { Bell, CircleUserRound, Cog, LayoutDashboard, LogOut, LucideIcon, Package, UsersRound } from "lucide-react";
import SidebarItem from "./item";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { frontendAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent} from "../ui/tooltip";

interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
}

const result = frontendAPI.get("/user/name");

const items: ISidebarItem[] = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },

    {
        name: "Estoque",
        icon: Package,
        path: "/stock"
    },

    {
        name: "Notificações",
        icon: Bell,
        path: "/notifications"
    },

    {
        name: "Usuários",
        icon: UsersRound,
        path: "/users"
    },

    {
        name: "Configurações",
        icon: Cog,
        path: "/settings"
    },

    {
        name: "Logout",
        icon: LogOut,
        path: "/logout"
    }

]

const Sidebar = () => {
    const [initial, setInitial] = useState("");
    const [nameUser, setNameUser] = useState("");

    useEffect(() => {
        const fetchName = async () => {
            try {
                const storedName = localStorage.getItem("userName");
                if (storedName) {
                    setNameUser(storedName);
                    setInitial(storedName.charAt(0));
                }
                const response = await frontendAPI.get("/user/name");
                const newName = response.data.name;
                if (storedName !== newName) {
                    setNameUser(newName);
                    setInitial(newName.charAt(0));
                    localStorage.setItem("userName", newName);
                }
            } catch (error) {
                console.error("Erro ao obter o nome do usuário:", error);
            }
        };
    
        fetchName();
    }, []);

    return (
        <div className="fixed top-0 left-0 h-screen w-64 z-10 p-4">
            <div className="flex flex-col space-y-10 w-full">
                <h2 className="text-principal text-3xl font-bold p-2 text-center">Coffre</h2>
                <div className="flex flex-col space-y-2">                   
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                <div className="flex items-center space-x-2 mb-2">
                                    <Avatar>
                                        <AvatarFallback className="border-2 border-principal font-semibold">{initial}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-md font-basae">Olá, {nameUser}.</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-sm">Olá, {nameUser}.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    {items.map((item) => (
                        <SidebarItem key={item.path} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;