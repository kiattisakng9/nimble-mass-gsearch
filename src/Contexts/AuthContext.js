import React, { useState, useEffect, useContext, createContext } from "react";
import Axios from "axios";

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
    const authResult = await Axios.post("/auth/login", credentials)
      .then((res) => (!res.data?.error ? res.data : null))
      .catch((err) => {
        console.log("err :", err);
        alert("something went wrong");
      });

    const resultIsValid = authResult != null;
    const isAuthenticated = resultIsValid ? authResult.authenticated : false;

    if (isAuthenticated) {
      const returnedUser = authResult.user;

      const stringifiedUser = JSON.stringify(returnedUser);
      sessionStorage.setItem("user", stringifiedUser);
      setUser(credentials);
    } else alert("Incorect login credentials");
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
