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
  console.log(expirationTime, 'expirationTime line 15');
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  console.log(adjExpirationTime, "adjExpirationTime line 18")

  const remainingDuration = adjExpirationTime - currentTime;

  console.log(remainingDuration, 'remeainingDuration line 22');

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  console.log(remainingTime, 'remainingTime Line 32')

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return { token: storedToken, duration: remainingTime };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  console.log(tokenData, 'tokenData');

  let initialToken = null;

  if (tokenData) {
    console.log("should reach line 50")
    initialToken = tokenData.token;
  }

  console.log(initialToken, 'initialToken Line 54')

  const initialDisplayName = localStorage.getItem("displayName");
  const initialLocalId = localStorage.getItem("locaId");

  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [localId, setLocalId] = useState(initialLocalId);

  const userIsLoggedIn = !!token;

  const loginHandler = (userData, expirationTime) => {
    console.log(expirationTime, 'experationTime line 66')
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
  }, [tokenData, logoutHandler])

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
