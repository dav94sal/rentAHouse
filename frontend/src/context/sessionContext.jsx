import { createContext, useContext, useState } from "react";
// import { useSelector } from "react-redux";

export const sessionContext = createContext();

export const useSession = () => useContext(sessionContext);

export default function SessionProvider({ children }) {
  const [session, setSession] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [hasSpots, setHasSpots] = useState(false);

  const value = {
    session,
    setSession,
    userExists,
    setUserExists,
    hasSpots,
    setHasSpots
  }

  return (
    <sessionContext.Provider
      value={value}
    >
      { children }
    </sessionContext.Provider>
  )
}
