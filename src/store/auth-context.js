import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  displayName: "",
  isLoggedIn: false,
  login: (userData) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [displayName, setDisplayName] = useState("");

  const userIsLoggedIn = !!token;

  const loginHandler = (userData) => {
    setToken(userData.token);
    setDisplayName(userData.displayName);
  };

  const logoutHandler = () => {
    setToken(null);
    setDisplayName("");
  };

  const contextValue = {
    token: token,
    displayName: displayName,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
