import React, { createContext, useCallback, useState } from "react"

interface NotificationContextData {
    alert: Notification | null;
    addAlert(notification: Notification): void;
    removeAlert(): void;
}

type Notification = {
    message: string;
    status: 'success' | 'error' | 'warning' | 'info';
};

type Props = {
    children?: React.ReactNode
};

const NotificationGlobalContext = createContext({} as NotificationContextData);

const NotificationProvider: React.FC<Props> = ({ children }) => {
    const [alert, setAlert] = useState<Notification | null>(null);

    //context de alerta animado
    const addAlert = useCallback((notify: Notification) => {
        setAlert(notify);
    }, []);

    const removeAlert = () => setAlert(null);

    const contextValue: NotificationContextData = {
        //context de alerta
        alert,
        addAlert: useCallback((notify) => addAlert(notify), [addAlert]),
        removeAlert: useCallback(() => removeAlert(), []),
    };

    return (
        <NotificationGlobalContext.Provider value={contextValue}>
            {children}
        </NotificationGlobalContext.Provider>
    );
}

export default NotificationGlobalContext;
export { NotificationProvider };