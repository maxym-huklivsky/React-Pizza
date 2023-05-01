import React from 'react';
import styles from './styles.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.block}>
      <h1>Ошибка!</h1>
      <p>За вашим запросом страницы не найдено</p>
    </div>
  );
};

export default NotFoundBlock;
