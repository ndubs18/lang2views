import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
  userInfo: {
    email: "",
    firstName: "",
    lastName: "",
    user_id: "",
  },
  setUserInfo: () => {},
});

// Create the provider component
export const GlobalContextProvider = ({ children }) => {
  const [userInfo, setUserInfoState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    user_id: "",
  });
  const setUserInfo = (key, value) => {
    setUserInfoState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <GlobalContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
