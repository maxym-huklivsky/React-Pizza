import debounce from 'lodash.debounce';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { TfiClose } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { params } from '../../consts';

import { setSearch } from '../../redux/filter/slice';
import styles from './styles.module.scss';

export const SearchBlock = () => {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = React.useState('');
  const dispatch = useDispatch();
  const isMouted = React.useRef(false);

  const inputRef = React.useRef();

  React.useEffect(() => {
    const search = searchParams.get(params.search);

    if (!isMouted.current && search) {
      setInputValue(search);
    }

    isMouted.current = true;
  }, [searchParams]);

  const changeSearch = React.useMemo(
    () =>
      debounce((v) => {
        dispatch(setSearch(v));
      }, 350),
    [dispatch],
  );

  const onChange = (e) => {
    const searchValue = e.target.value.trim();
    setInputValue(searchValue);
    changeSearch(searchValue);
  };

  const reset = () => {
    setInputValue('');
    dispatch(setSearch(''));
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <BsSearch color="grey" size="24" className={`${styles.icon} ${styles.iconSearch}`} />
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Search ..."
        value={inputValue}
        onChange={onChange}
      />
      {inputValue && (
        <TfiClose
          color="grey"
          size="24"
          className={`${styles.icon} ${styles.iconClose}`}
          onClick={reset}
        />
      )}
    </div>
  );
};
