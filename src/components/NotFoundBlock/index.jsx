import React from "react";

import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено.
      </h1>
      <p>
        К сожалению в нашем магазине нет страницы которую Вы искали, перейдите
        на главную и начните сначала.
      </p>
    </div>
  );
}
