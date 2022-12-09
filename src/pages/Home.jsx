import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

export default function Home() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://6393398dab513e12c507abcf.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {items.map((obj) => (
          <PizzaBlock key={obj.id} {...obj} />
        ))}
      </div>
    </div>
  );
}
