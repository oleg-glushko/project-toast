import { useCallback, useEffect } from 'react';
import { useState, createContext, useMemo } from 'react';

export const ToastContext = createContext();

function ToastProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, variant) => {
        const newNotification = {
            id: crypto.randomUUID(),
            message,
            variant,
        }
        setNotifications([...notifications, newNotification]), [notifications];
    }, [notifications]);

    const dismissNotification = useCallback((id) => {
        const itemToDelete = notifications.findIndex(item => item.id == id);
        if (itemToDelete === -1)
            return;

        setNotifications([
            ...notifications.slice(0, itemToDelete),
            ...notifications.slice(itemToDelete + 1)]);
    }, [notifications]);

    useEffect(() => {
        function clearNotifications(event) {
            if (event.key === 'Escape')
                setNotifications([]);
        }
        window.addEventListener("keydown", clearNotifications);

        return () => window.removeEventListener("keydown", clearNotifications);
    }, []);

    const value = useMemo(() => ({
        notifications,
        addNotification,
        dismissNotification,
    }), [notifications, addNotification, dismissNotification]);

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
}

export default ToastProvider;
