import React from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, selectPizzaData } from "../redux/pizza/slice";

import {
  selectFilter,
  setCurrentPage,
  setQuery,
} from "../redux/filter/slice";
import { setTitle } from "../utils/baseHook";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlockSkeleton";
import Sort, { sorts } from "../components/Sort";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../redux/store";
import { Status } from "../redux/pizza/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isQuery = React.useRef(false);
  
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setTitle("Главная");
  }, []);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
    
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

  function getPizzas() {
    const category = categoryId > 0 ? `category_id=${categoryId}` : "";
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const orderBy = sort.sortProperty.replace("-", "");
    const search = searchValue ? `&title=${searchValue}` : "";
    
    dispatch(fetchPizzas({ category, order, orderBy, search, currentPage }));
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
        <Categories categoryId={categoryId} />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {status === "loading"
          ? [...new Array(10)].map((_, i) => <PizzaBlockSkeleton key={i} />)
          : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>

      {status === Status.ERROR && (
        <div className="NotFoundBlock_root__ZfXea">
          <h1>
            <span>😕</span>
            <br />
            Ой! Произошла ошибка.
          </h1>
          <p>Попробуйте обновить страницу или зайдите позже.</p>
        </div>
      )}

      {status === Status.SUCCESS && (
        <Pagination
          onChangePage={(number: number) => dispatch(setCurrentPage(number))}
        />
      )}
    </div>
  );
}

export default Home