import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

export default function Default() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
