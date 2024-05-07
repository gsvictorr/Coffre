'use client';
import { Button } from "@/components/ui/button";
import { NotificationsContext } from "@/context/notifications-context";
import { frontendAPI } from "@/lib/api";
import { Loader2, Trash2 } from "lucide-react";
import { useContext, useState } from "react";

type RemoveNotificationProps = {
    id: number;
}


export function RemoveButton({id} : RemoveNotificationProps){
    const notificationsContext = useContext(NotificationsContext);
    const [loading, setLoading] = useState(false);

    async function removeNotification(id: number){
        setLoading(true);
        try {
            const url = `/notifications/${id}`;
            const result = await frontendAPI.delete(url);
            notificationsContext.refreshNotifications();
        } catch (error) {
    
        } finally{
            setLoading(false);
        }
    }

    return(
        <Button className="group" key={id} variant={"ghost"} disabled={loading} onClick={async () => await removeNotification(id)}>{loading ? <Loader2 className="animate-spin h-5 w-5" /> : (<Trash2 className="h-4 w-4 text-gray-500 group-hover:text-red-800"></Trash2>)}</Button>
    )
}