import { createContext, useContext, useState } from "react";
import { INotification } from "../../types/notification";
import { Notification } from "./notification";
import { Container } from "./styles";

const noop = () => { };

const NotificationsContext = createContext<(notification: INotification) => void>(noop);

interface INotificationEx extends INotification {
    id: string;
}

interface IProps {
    children: JSX.Element;
}

export const NotificationsProvider = (props: IProps) => {
    const [notifications, setNotifications] = useState<INotificationEx[]>([]);

    const showNotification = (notification: INotification) => {
        const notificationEx: INotificationEx = {
            ...notification,
            id: Math.random().toString(),
        };

        setNotifications([
            ...notifications,
            notificationEx,
        ]);
    };

    const closeNotification = (id: string) => {
        setNotifications(notifications =>
            notifications.filter(notification => notification.id !== id)
        );
    };

    return (
        <NotificationsContext.Provider value={showNotification}>
            {props.children}

            <Container>
                {notifications.map(notification =>
                    <Notification key={notification.id} notification={notification} close={() => closeNotification(notification.id)} />
                )}
            </Container>
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationsContext);
