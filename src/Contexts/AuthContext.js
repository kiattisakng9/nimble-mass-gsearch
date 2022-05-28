import React, { useState, useEffect, useContext, createContext } from "react";

// Create a authentication context
const authContext = createContext();

// Authenticator context provider hook
const useProvideAuth = () => {
  // User in context
  const [user, setUser] = useState(null);

  // User stored in browser session storage
  const sessionUser = sessionStorage?.getItem("user");

  useEffect(() => {
    if (sessionUser && user?.email === sessionUser?.email) {
      const parsedUser = JSON.parse(sessionUser);

      setUser(parsedUser);
    }
  }, [sessionUser]);

  // Sign user in function
  const signin = async (credentials) => {
    const stringifiedUser = JSON.stringify(credentials);
    sessionStorage.setItem("user", stringifiedUser);
    setUser(credentials);
  };

  // Sign user out function
  const signout = async () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return { user, signin, signout };
};

// Authenticator context provider
export function ProvideAuth({ children }) {
  const loggedInUser = useProvideAuth();

  return (
    <authContext.Provider value={loggedInUser}>{children}</authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
