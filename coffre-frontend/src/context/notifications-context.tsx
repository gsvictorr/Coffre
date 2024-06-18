'use client';
import { NotificationType } from "@/app/api/notifications/route"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { frontendAPI } from "@/lib/api";
import { createContext, useEffect, useState } from "react";



type NotificationsContextType = {
    notifications: NotificationType[];
    refreshNotifications: () => void;
}


export const NotificationsContext = createContext({} as NotificationsContextType);

export function NotificationsContextProvider({children} : {children: React.ReactNode}){

    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotifications().then((response) => {
            setNotifications(response);
            setLoading(false);
        });
    }, []);

    async function getNotifications(): Promise<NotificationType[]> {
        try {
            const result = await frontendAPI.get("/notifications");
            const notifications = result.data.notifications as NotificationType[];
            return notifications;
        } catch (error) {
            return [];
        }
    }

    function refreshNotifications() {
        getNotifications().then((response) => {
            setNotifications(response);
        });
    }

    return (
        <NotificationsContext.Provider value={{ notifications, refreshNotifications }}>
                {!loading ? children : <LoadingSkeleton/>}
                </NotificationsContext.Provider>
    );
}