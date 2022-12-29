import React from "react";
import debounce from "lodash.debounce";
import { AppContext } from "../../layouts/Default";

import styles from "./Search.module.scss";

export default function Search() {
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);

  const onInputClear = () => {
    setValue("");
    setSearchValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    []
  );

  const onChangeInput = (str) => {
    setValue(str);
    updateSearchValue(str);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>

      <input
        onChange={(event) => onChangeInput(event.target.value)}
        ref={inputRef}
        value={value}
        type="text"
        className={styles.input}
        placeholder="Поиск ..."
      />

      {searchValue && (
        <svg
          onClick={onInputClear}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.close}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </div>
  );
}
