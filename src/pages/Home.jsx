import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlockSkeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

import { useState } from "react";
import { AppContext } from "../layouts/Default";

export default function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);
  const [sortBy, setSortBy] = React.useState({
    title: "Популярности (Убыванию)",
    sortProperty: "rating",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { searchValue } = React.useContext(AppContext);

  React.useEffect(() => {
    const category =
      activeCategoryIndex > 0 ? `category_id=${activeCategoryIndex}` : "";

    const order = sortBy.sortProperty.includes("-") ? "asc" : "desc";
    const orderBy = sortBy.sortProperty.replace("-", "");
    const search = searchValue ? `&title=${searchValue}` : "";

    setIsLoading(true);

    fetch(
      `/items?page=${currentPage}&limit=4&${category}&orderBy=${orderBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [activeCategoryIndex, sortBy, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={activeCategoryIndex}
          onClick={(catId) => setActiveCategoryIndex(catId)}
        />

        <Sort sortBy={(obj) => setSortBy(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, i) => <PizzaBlockSkeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
