import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from '../consts';
import { selectCategory } from '../redux/filter/selectors';

import { setCategory } from '../redux/filter/slice';

const Categories = () => {
  const activeCategory = useSelector(selectCategory);
  const dispatch = useDispatch();

  const onChangeCategory = (ind) => {
    dispatch(setCategory(ind));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, ind) => (
          <li
            key={ind}
            onClick={() => onChangeCategory(ind)}
            className={activeCategory === ind ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
