import { useEffect } from "react";

import NotFoundBlock from "../components/NotFoundBlock";
import { setTitle } from "../hook/baseHook";

export default function NotFound() {
  useEffect(() => {
    setTitle("404");
  }, []);

  return <NotFoundBlock />;
}
