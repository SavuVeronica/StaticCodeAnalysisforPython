import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [userId, setUserId] = useState();

    const getUserId = async () => {
      return userId;
    }

    const saveUserId = id => {
      // ID will be stored in session storage, to be able to get it if the user refreshes the page
      sessionStorage.setItem('userId', JSON.stringify(id));
      setUserId(id);
    };

    const clearUserId = () => {
      // When user loggs out, the token should be cleared
      sessionStorage.removeItem('userId');
      setUserId(undefined);
  }

    return (
        <UserContext.Provider
          value={{
            userId,
            saveUserId,
            clearUserId
          }}
        >
          {props.children}
        </UserContext.Provider>
      );
};

export default UserContextProvider;