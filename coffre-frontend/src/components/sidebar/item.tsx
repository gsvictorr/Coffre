'use client';
import { AuthContext } from "@/context/auth-context";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useMemo } from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
}

const SidebarItem = ({ item }: { item: ISidebarItem }) => {

    const { name, icon: Icon, path } = item;

    const router = useRouter();
    const pathname = usePathname();
    const authContext = useContext(AuthContext);
    const dispatcher = () => {
        router.push(path);
    };

    const verify = () => {
        if (path === "/logout") {
            authContext.signOut();
        } else {
            dispatcher();
        }
    }

    const isActive = useMemo(() => {
        return path === pathname;
    }, [path, pathname])

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`flex item-center space-x-2 p-3 rounded-none dark:hover:bg-zinc-900 hover:border-l-4 hover:border-principal cursor-pointer ${isActive && "border-l-4 border-principal"}`} onClick={verify}>
                        <Icon size={20} className={`${isActive && "text-principal"}`} />
                        <p className={`text-sm font-semibold ${isActive && "text-principal"}`}>{name}</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="text-sm">{name}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default SidebarItem;