import React, { createContext, useContext, ReactNode, useState } from 'react';
import Account from "./Account";

interface AuthContextProps {
    authenticatedAccount: Account | null;
    setAuthenticatedAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authenticatedAccount, setAuthenticatedAccount] = useState<Account | null>(null);

    return (
        <AuthContext.Provider value={{ authenticatedAccount, setAuthenticatedAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
