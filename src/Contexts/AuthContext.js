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

  // Register a new user function
  const registerUser = async (params) => {
    const registrationResults = await Axios.post("/users", params)
      .then((res) => res.data)
      .catch((err) => {
        console.log("err :", err);
        alert("something went wrong");
      });

    // Errors returned
    const resultErrors = registrationResults?.error ?? null;
    const hasErrors = resultErrors != null;

    // Display error message if errors are returned
    if (hasErrors) {
      const errorMessage = getErrorMessages(resultErrors);

      const errorBody = `Errors detected!\n ${errorMessage}`;

      alert(errorBody);
    } else alert("User is created successfully!");
  };

  // Sign user in function
  const signin = async (credentials) => {
    const authResult = await Axios.post("/auth/login", credentials)
      .then((res) => (!res.data?.error ? res.data : null))
      .catch((err) => {
        console.log("err :", err);
        alert("something went wrong");
      });

    // Errors returned
    const resultIsValid = authResult != null;
    const isAuthenticated = resultIsValid ? authResult.authenticated : false;

    // Display error message if errors are returned
    if (isAuthenticated) {
      const returnedUser = authResult.user;

      const stringifiedUser = JSON.stringify(returnedUser);

      // Set user in context and browser session
      sessionStorage.setItem("user", stringifiedUser);
      setUser(returnedUser);
    } else alert("Incorect login credentials");
  };

  // Sign user out function
  const signout = async () => {
    // Remove user from context and browser session
    setUser(null);
    sessionStorage.removeItem("user");
  };

  // Build error messages from error returned
  const getErrorMessages = (errors) => {
    const errorParamMessage = errors.map(
      (error) => `* ${error.param} - ${error.msg}\n`
    );

    return errorParamMessage;
  };

  return { user, registerUser, signin, signout };
};

// Authenticator context provider
export function ProvideAuth({ children }) {
  const loggedInUser = useProvideAuth();

  return (
    <authContext.Provider value={loggedInUser}>{children}</authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
