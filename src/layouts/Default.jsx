import { useState, createContext } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

export const AppContext = createContext({});

export default function Default() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />

        <div className="content">
          <Outlet />
        </div>
      </AppContext.Provider>
    </div>
  );
}
