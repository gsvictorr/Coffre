'use client';

import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { ChevronRight, Navigation } from "lucide-react";

interface CurrentPageProps {
    path: string;
}

const CurrentPage: React.FC<CurrentPageProps> = ({ path }) => {
    return (
        <div className="rounded-md mt-3 p-1 mb-4 flex gap-1 items-center bg-zinc-50 dark:bg-zinc-900 justify-between">
        <div className="flex gap-1 items-center">
            <Navigation className="font-bold" size={14} />
            <p className="text-principal font-bold">Coffre </p>
            <ChevronRight size={14}/>
            <p>{path}</p>
        </div>
            <ThemeSwitcher></ThemeSwitcher>
        </div>
    );
    
};

export default CurrentPage;