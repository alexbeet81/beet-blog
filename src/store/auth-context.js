import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  displayName: "",
  localId: "",
  isLoggedIn: false,
  login: (userData) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return { token: storedToken, duration: remainingTime };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken = null;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const initialDisplayName = localStorage.getItem("displayName");
  const initialLocalId = localStorage.getItem("localId");

  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [localId, setLocalId] = useState(initialLocalId);

  const userIsLoggedIn = !!token;

  const loginHandler = (userData, expirationTime) => {
    setToken(userData.token);
    setDisplayName(userData.displayName);
    setLocalId(userData.localId);

    localStorage.setItem("token", userData.token);
    localStorage.setItem("displayName", userData.displayName);
    localStorage.setItem("localId", userData.localId);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    setDisplayName("");
    setLocalId("");

    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    localStorage.removeItem("localId");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

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
