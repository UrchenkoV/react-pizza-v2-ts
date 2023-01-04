import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { setCurrentPage, setQuery } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlockSkeleton";
import Sort, { sorts } from "../components/Sort";
import Pagination from "../components/Pagination";

import { AppContext } from "../layouts/Default";

export default function Home() {
  const navigate = useNavigate();
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isMounted = React.useRef(false);
  const isQuery = React.useRef(false);

  const { searchValue } = React.useContext(AppContext);
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const setQueryParams = () => {
    const params = qs.stringify(
      {
        category: categoryId,
        sort: sort.sortProperty,
        page: currentPage,
      },
      { addQueryPrefix: true }
    );
    navigate(params);
  };

  function getQueryParams() {
    const parse = qs.parse(window.location.search.substring(1));

    dispatch(
      setQuery({
        ...parse,
        sort: sorts.find((s) => s.sortProperty === parse.sort),
      })
    );
    isQuery.current = true;
  }

  async function getPizzas() {
    const category = categoryId > 0 ? `category_id=${categoryId}` : "";
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const orderBy = sort.sortProperty.replace("-", "");
    const search = searchValue ? `&title=${searchValue}` : "";

    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://6393398dab513e12c507abcf.mockapi.io/items?page=${currentPage}&limit=4${search}&${category}&orderBy=${orderBy}&order=${order}`
      );
      setItems(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    if (window.location.search) {
      getQueryParams();
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      setQueryParams();
      getQueryParams();
      getPizzas();
    }

    if (!isQuery.current) {
      getPizzas();
    }

    isQuery.current = true;
    isMounted.current = true;
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
