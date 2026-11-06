"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import usersJson from "../database/users.json";

export type User = (typeof usersJson)[number];

export const emptyUser: User = {
  _id: "",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "STUDENT",
  loginId: "",
  section: "",
  lastActivity: "",
  totalActivity: "00:00:00",
};

type AccountContextValue = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  addUser: (user: User) => User;
  updateUser: (user: User) => void;
};

const AccountContext = createContext<AccountContextValue | null>(
  null
);

export function AccountProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(usersJson);

  const addUser = (user: User): User => {
    const newUser = {
      ...user,
      _id: crypto.randomUUID(),
    };

    setUsers((previous) => [...previous, newUser]);
    return newUser;
  };

  const updateUser = (user: User) => {
    setUsers((previous) =>
      previous.map((u) => (u._id === user._id ? { ...user } : u))
    );

    setCurrentUser((previous) =>
      previous?._id === user._id ? { ...user } : previous
    );
  };

  return (
    <AccountContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        addUser,
        updateUser,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const value = useContext(AccountContext);

  if (!value) {
    throw new Error(
      "useAccountContext must be used inside AccountProvider"
    );
  }

  return value;
}