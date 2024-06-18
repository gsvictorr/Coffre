'use client';

import { NotificationsList } from "@/components/notifications/notifications-list";
import CurrentPage from "@/components/reusable/current-page";
import { NotificationsContextProvider } from "@/context/notifications-context";
import { Suspense } from "react";


export default function Notifications() {
    return (
        <>
            <NotificationsContextProvider>
                <div>
                    <CurrentPage path={"/notifications"} name={"Notificações"}></CurrentPage>
                    <Suspense fallback={"Carregando..."}>
                    <NotificationsList></NotificationsList>
                    </Suspense>
                </div>
            </NotificationsContextProvider>
        </>
    );
}