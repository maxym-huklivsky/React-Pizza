import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Skeleton';
import Sort from '../components/Sort';
import { requestConfig, requestForPizzaList } from '../httpRequests/main';
import { categories, sortArray } from '../consts';
import { setFilters, setTotalPages } from '../redux/filter/slice';
import { useSearchParams } from 'react-router-dom';
import { selectFilter } from '../redux/filter/selectors';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category, sort, search, page } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMouted = React.useRef(false);

  const [pizzas, setPizzas] = React.useState([]); // временно
  const [isLoading, setIsLoading] = React.useState(false); // временно

  const activeSort = sortArray[sort].en;
  const order = sortArray[sort].order;

  React.useEffect(() => {
    if (isMouted.current) return;
    if (!searchParams.size) return;

    const obj = Object.fromEntries([...searchParams]);
    if (obj.category)
      obj.category = Number(categories.findIndex((v) => v.toLowerCase() === obj.category));

    if (obj.sort) obj.sort = Number(sortArray.findIndex((v) => v.ru === obj.sort));

    if (obj.page) obj.page = Number(obj.page);

    dispatch(setFilters(obj));
    isSearch.current = true;
  }, [dispatch, searchParams]);

  React.useEffect(() => {
    if (!isSearch.current) {
      setIsLoading(true);

      requestForPizzaList({
        activeSort,
        order,
        category,
        page,
        search,
      })
        .then(({ resp, totalPages }) => {
          setPizzas(resp.data);
          dispatch(setTotalPages(totalPages));
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }

    isSearch.current = false;
  }, [category, dispatch, order, page, search, activeSort]);

  React.useEffect(() => {
    if (isMouted.current) {
      const params = { page };
      params.category = categories[category].toLowerCase();
      params.sort = sortArray[sort].ru;
      if (search) params.search = search;

      setSearchParams(params);
    }

    isMouted.current = true;
  }, [category, page, search, setSearchParams, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoading ? (
          [...new Array(requestConfig.limit)].map((_, i) => <Skeleton key={i} />)
        ) : (
          <>
            {pizzas.length ? (
              pizzas.map((pizza) => <Pizza key={pizza.id} {...pizza} />)
            ) : (
              <h1>За Вашим запросом ничего не найдено</h1>
            )}
          </>
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default Home;
