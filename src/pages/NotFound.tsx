import React from "react";

import NotFoundBlock from "../components/NotFoundBlock";
import { setTitle } from "../hook/baseHook";

const NotFound: React.FC = () => {
  React.useEffect(() => {
    setTitle("404");
  }, []);

  return <NotFoundBlock />;
}

export default NotFound