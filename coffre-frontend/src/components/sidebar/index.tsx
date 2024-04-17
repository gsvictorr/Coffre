'use client';

import { Bell, CircleUserRound, Cog, LayoutDashboard, LogOut, LucideIcon, Package } from "lucide-react";
import SidebarItem from "./item";

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
        name: "Perfil",
        icon: CircleUserRound,
        path: "/profile"
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
    return (
        <div className="fixed top-0 left-0 h-screen w-64 z-10 p-4">
            <div className="flex flex-col space-y-10 w-full">
                <h2 className="text-principal text-3xl font-bold p-2 text-center">Coffre</h2>
                <div className="flex flex-col space-y-2">
                    {items.map((item) => (
                        <SidebarItem key={item.path} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;