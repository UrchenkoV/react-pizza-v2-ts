import React from "react";

import NotFoundBlock from "../components/NotFoundBlock";
import { setTitle } from "../utils/baseHook";

const NotFound: React.FC = () => {
  React.useEffect(() => {
    setTitle("404");
  }, []);

  return <NotFoundBlock />;
}

export default NotFound