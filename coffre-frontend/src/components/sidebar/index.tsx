'use client';

import { Bell, CircleUserRound, Cog, LayoutDashboard, LogOut, LucideIcon, Menu, Package, UsersRound, X } from "lucide-react";
import SidebarItem from "./item";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { frontendAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent} from "../ui/tooltip";
import Image from "next/image";
import logo from "../../../public/logo.png";


interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
}

const result = frontendAPI.get("/user/info");

export const items: ISidebarItem[] = [
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
    const [emailUser, setEmailUser] = useState("");
    const [isClick, setClick] = useState(false);

    const toggleNavBar = () => {
        setClick(!isClick);
    };

    useEffect(() => {
        const fetchName = async () => {
            try {
                const storedName = localStorage.getItem("userName");
                const storedEmail = localStorage.getItem("userEmail");
                if (storedName) {
                    setNameUser(storedName);
                    setInitial(storedName.charAt(0));
                }

                if(storedEmail){
                    setEmailUser(storedEmail);
                }

                const response = await frontendAPI.get("/user/info");
                const newName = response.data.name;
                const newEmail = response.data.email;
                if (storedName !== newName) {
                    setNameUser(newName);
                    setInitial(newName.charAt(0));
                    localStorage.setItem("userName", newName);
                }

                if (storedEmail !== newEmail) {
                    setEmailUser(newEmail);
                    localStorage.setItem("userEmail", newEmail);
                }
            } catch (error) {
                console.error("Erro ao obter o nome do usuário:", error);
            }
        };
    
        fetchName();
    }, []);

    return (
        <div>
            <nav className={`md:hidden fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 bg-principal`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-8">
                    <div className="flex items-center">
                        <a href="/dashboard" className="text-white text-xl font-semibold">
                            <Image
                                alt="coffre-logo"
                                src={logo}
                                width={30}
                                height={30}
                            />
                        </a>
                    </div>
                    <div className="flex items-center">
                        <button className="inline-flex items-center justify-center p-1 rounded-md text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={toggleNavBar}>
                            {isClick ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>
            {isClick && (
                <div className="md:hidden bg-principal rounded-2xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {items.map((item) => (
                            <a
                                key={item.path}
                                href={item.path}
                                className="transition duration-150 ease-in-out block text-xl font-semibold p-1 text-white hover:text-black flex items-center space-x-2"
                            >
                                <item.icon />
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
        <div className="hidden md:flex fixed top-0 left-0 h-screen w-64 z-10 p-4">
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
                                    <div className="flex flex-col"> 
                                        <span className="text-md font-base text-left">Olá, {nameUser}.</span>
                                        <span className="text-xs">{emailUser}</span>
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">Olá, {nameUser}.</p>
                                <p>{emailUser}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {items.map((item) => (
                        <SidebarItem key={item.path} item={item} />
                    ))}
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default Sidebar;