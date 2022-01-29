import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  displayName: "",
  localId: "",
  isLoggedIn: false,
  login: (userData) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [localId, setLocalId] = useState("");

  const userIsLoggedIn = !!token;

  const loginHandler = (userData) => {
    setToken(userData.token);
    setDisplayName(userData.displayName);
    setLocalId(userData.localId);
  };

  const logoutHandler = () => {
    setToken(null);
    setDisplayName("");
    setLocalId("");
  };

  const contextValue = {
    token: token,
    displayName: displayName,
    localId: localId,
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
