import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CellEmpty from '../cell-empty/cell-empty';
import styles from './orders-element.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientsElement } from '../../utils/types';

const OrdersElement: FC<IIngredientsElement> = ({data}) => {
  const location = useLocation();

  return (
    <Link to={{pathname: `/ingredients/${data._id}`, state: { from: location }}} className={styles.order}>
      <CellEmpty height="mt-6"/>
      <div className={styles.info}>
        <p className={`${styles.number} text text_type_digits-default`}>#034535</p>
        <p className={`${styles.date} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
      </div>
      <p className={`${styles.title} text text_type_main-medium mt-6 mb-6`}>Death Star Starship Main бургер</p>
      <div className={styles.content}>
        <div className={styles.frame}>
          <img className={styles.image} src={data.image_mobile} alt={data.name}/>
        </div>
        <div className={styles.price}>
          <p className={`${styles.number} text text_type_digits-default`}>{data.price}</p>
          <CellEmpty height="ml-2"/>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <CellEmpty height="mt-6"/>
    </Link>
  );
}

export default OrdersElement;
