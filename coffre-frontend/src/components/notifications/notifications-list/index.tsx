'use client';

import { NotificationType } from "@/app/api/notifications/route";
import { useContext, useEffect } from "react";
import { NotificationsContext } from "@/context/notifications-context";
import { RemoveButton } from "../remove-button";

interface CardNotificationProps {
    notification: NotificationType;
}


export default function CardNotification({ notification }: CardNotificationProps) {
    return (
        <div className="rounded-md p-2 border shadow-md mb-4 w-80 transition ease-in-out delay-300 ">
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-xs text-white bg-principal rounded-full px-2">#{notification.id}</span>
                    <h2 className="text-lg font-semibold">{notification.tittle}</h2>
                </div>
                <RemoveButton id={notification.id}></RemoveButton>
              </div>
            <p className="text-sm">{notification.description}</p>
            <p className="text-xs text-gray-500">{notification.date}</p>
        </div>
    );
}

export function NotificationsList() {
    const { notifications, refreshNotifications } = useContext(NotificationsContext);

    useEffect(() => {
        refreshNotifications();
    }, [refreshNotifications]);

    return (
        <div className="grid grid-cols-4 gap-2 mt-4">
            {notifications.length === 0 ? (
                <h2>Não há notificações para mostrar.</h2>
            ) : (
                notifications.map((notification) => (
                    <CardNotification key={notification.id} notification={notification} />
                ))
            )}
        </div>
    );
}