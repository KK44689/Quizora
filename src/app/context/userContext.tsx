import { createContext, useContext, useEffect, useState } from "react";
import { fetchCurrentUser } from "../lib/users";

interface UserContextType {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
  quizPassed: number;
  correctAnswers: number;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType>();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchCurrentUser();
      if (data) setUser(data);
    }

    fetchUser();
  }, []);

  if (!user) return;

  return (
    <UserContext.Provider value={{ _id: user._id, firstName: user.firstName, lastName: user.lastName, image: user.image, quizPassed: user.quizPassed, correctAnswers: user.correctAnswers }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
