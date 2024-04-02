'use client';
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
}

const SidebarItem = ({item}: {item:ISidebarItem}) => {

    const {name, icon: Icon, path} = item;

    const router = useRouter();
    const pathname = usePathname();
    const dispatcher = () => {
        router.push(path);
    };

    const isActive = useMemo(() => {
        return path === pathname;
    }, [path, pathname])

    return (
        <div className={`flex item-center space-x-2 p-3 rounded-none dark:hover:bg-zinc-900 hover:border-l-4 hover:border-principal cursor-pointer ${isActive && "border-l-4 border-principal"}`} onClick={dispatcher}>
            <Icon size={20}/>
            <p className="text-sm font-semibold">{name}</p>
        </div>
    );
};

export default SidebarItem;