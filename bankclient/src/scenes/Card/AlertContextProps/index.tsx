import React, { createContext, useContext, useState, ReactNode } from 'react';
import {Alert} from "@mui/material";

interface AlertContextProps {
    showAlert: (message: string, severity: 'error' | 'warning' | 'info' | 'success') => void;
    hideAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

interface AlertProviderProps {
    children: ReactNode;
}

// ... (imports)

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [notification, setNotification] = useState<{ message: string; severity: 'error' | 'warning' | 'info' | 'success' } | null>(
        null
    );

    const showAlert = (message: string, severity: 'error' | 'warning' | 'info' | 'success') => {
        setNotification({ message, severity });
        setTimeout(() => hideAlert(), 3000);
    };

    const hideAlert = () => {
        setNotification(null);
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {notification && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column-reverse', // Stack alerts in reverse order
                    }}
                >
                    {/* Render your Alert component here using the notification state */}
                    <Alert variant="filled" severity={notification.severity}>
                        {notification.message}
                    </Alert>
                </div>
            )}
        </AlertContext.Provider>
    );
};


export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
