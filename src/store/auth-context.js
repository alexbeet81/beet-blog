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
  const initialToken = localStorage.getItem("token");
  const initialDisplayName = localStorage.getItem("displayName");
  const initialLocalId = localStorage.getItem("locaId");

  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [localId, setLocalId] = useState("");

  const userIsLoggedIn = !!token;

  const loginHandler = (userData) => {
    setToken(userData.token);
    setDisplayName(userData.displayName);
    setLocalId(userData.localId);

    localStorage.setItem("token", userData.token);
    localStorage.setItem("displayName", userData.displayName);
    localStorage.setItem("localId", userData.localId);
  };

  const logoutHandler = () => {
    setToken(null);
    setDisplayName("");
    setLocalId("");

    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    localStorage.removeItem("localId");
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
