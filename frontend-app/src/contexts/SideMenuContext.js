import React from "react";
import { createContext, useState } from "react";

export const SideMenuContext = createContext();

const MenuContextProvider = (props) => {

    const [currentPage, setCurrentPage] = useState();

    const getCurrentPage = async () => {
      return currentPage;
    }

    return (
        <SideMenuContext.Provider
          value={{
            currentPage,
            getCurrentPage,
            setCurrentPage
          }}
        >
          {props.children}
        </SideMenuContext.Provider>
      );
};

export default MenuContextProvider;