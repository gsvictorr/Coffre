// Sidebar.tsx
'use client';

import { Bell, Cog, LayoutDashboard, LogOut, LucideIcon, Menu, Package, UsersRound, X } from "lucide-react";
import SidebarItem from "./item";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import Image from "next/image";
import logo from "../../../public/logo.png";

interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
}

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
];

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const [isClick, setClick] = useState(false);

    const toggleNavBar = () => {
        setClick(!isClick);
    };

    const filteredItems = items.filter(item => {
        if (user?.userRole === "USER") {
            return item.name !== "Notificações" && item.name !== "Usuários";
        }
        return true;
    });

    return (
        <div>
            <nav className={`md:hidden fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 shadow-lg slideIn `}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-8">
                        <div className="flex items-center">
                            <a href="/dashboard">
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
                                {isClick ? <X className="text-principal"/> : <Menu className="text-principal"/>}
                            </button>
                        </div>
                    </div>
                </div>
                {isClick && (
                    <div className="md:hidden dark:text-white bg-white rounded-2xl dark:bg-bgdark slideIn mt-2">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {filteredItems.map((item) => (
                                <SidebarItem key={item.path} item={item} />
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
                                <TooltipTrigger asChild>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Avatar>
                                            <AvatarFallback className="border-2 border-principal font-semibold">{user?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-md font-base text-left">Olá, {user?.name}.</span>
                                            <span className="text-xs">{user?.email}</span>
                                        </div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">Olá, {user?.name}.</p>
                                    <p>{user?.email}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {filteredItems.map((item) => (
                            <SidebarItem key={item.path} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
