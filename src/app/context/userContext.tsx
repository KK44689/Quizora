'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { fetchCurrentUser } from "../lib/users";
import { ProfileInfo } from "../lib/definition";

const UserContext = createContext<{
  user: ProfileInfo | null;
  setUser: React.Dispatch<React.SetStateAction<ProfileInfo | null>>;
} | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ProfileInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchCurrentUser();
      if (data) setUser(data);
    }

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
