'use client';
import React, { createContext, useContext, useState } from 'react';

type UserContextProviderProps = {
    children: React.ReactNode;
}

type UserContext = {
    user: {
        email?: string;
        name?: string;
        id?: number;
    }
    setUser: React.Dispatch<React.SetStateAction<{}>>;
}

export const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider
        value={{ 
            user,
            setUser
        }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
}