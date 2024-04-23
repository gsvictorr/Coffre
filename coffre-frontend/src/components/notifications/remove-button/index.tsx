'use client';
import { Button } from "@/components/ui/button";
import { NotificationsContext } from "@/context/notifications-context";
import { frontendAPI } from "@/lib/api";
import { Trash2 } from "lucide-react";
import { useContext } from "react";

type RemoveNotificationProps = {
    id: number;
}


export function RemoveButton({id} : RemoveNotificationProps){
    const notificationsContext = useContext(NotificationsContext);

    async function removeNotification(id: number){
        try {
            const url = `/notifications/${id}`;
            const result = await frontendAPI.delete(url);
            notificationsContext.refreshNotifications();
        } catch (error) {
    
        }
    }

    return(
        <Button className="group" key={id} variant={"ghost"} onClick={async () => await removeNotification(id)}><Trash2 className="h-4 w-4 text-gray-500 group-hover:text-red-800"></Trash2></Button>
    )
}