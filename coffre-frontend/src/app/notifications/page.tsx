import { NotificationsList } from "@/components/notifications/notifications-list";
import CurrentPage from "@/components/reusable/current-page";
import { NotificationsContextProvider } from "@/context/notifications-context";


export default function Notifications() {
    return (
        <>
            <NotificationsContextProvider>
                <div>
                    <CurrentPage path={"Notificações"}></CurrentPage>
                    <NotificationsList></NotificationsList>
                </div>
            </NotificationsContextProvider>
        </>
    );
}