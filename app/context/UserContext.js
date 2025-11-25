"use client";
import { createContext, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children, profile }) {
  return (
    <UserContext.Provider value={profile}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);