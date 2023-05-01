import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import { useDispatch, useSelector } from 'react-redux';

import { setPage } from '../../redux/filter/slice';
import styles from './Pagination.module.scss';
import { selectPage, selectTotalPages } from '../../redux/filter/selectors';

const Pagination = () => {
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();

  const onChange = (curPage) => {
    dispatch(setPage(curPage));
  };

  return (
    <ResponsivePagination
      className={styles.root}
      current={page}
      total={totalPages}
      onPageChange={onChange}
    />
  );
};

export default Pagination;
