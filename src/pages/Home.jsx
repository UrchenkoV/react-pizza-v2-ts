import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setCurrentPage } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlockSkeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

import { AppContext } from "../layouts/Default";

export default function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { searchValue } = React.useContext(AppContext);
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  React.useEffect(() => {
    const category = categoryId > 0 ? `category_id=${categoryId}` : "";
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const orderBy = sort.sortProperty.replace("-", "");
    const search = searchValue ? `&title=${searchValue}` : "";

    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `/items?page=${currentPage}&limit=4&${category}&orderBy=${orderBy}&order=${order}${search}`
        );
        setItems(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, [searchValue, currentPage, categoryId, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, i) => <PizzaBlockSkeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>

      <Pagination onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </div>
  );
}
