import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

function PageNotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__container}>
        <h2 className='text text_type_digits-large'>404</h2>
        <p className='text text_type_main-default'>Страница не найдена</p>
        <Link to={'/'} className={`text text_type_main-default ${styles.notFound__exit}`}>На Главную</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
