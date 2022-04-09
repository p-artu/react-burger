import React, { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CellEmpty from '../cell-empty/cell-empty';
import styles from './orders-element.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import { formatRelative } from 'date-fns';
import { ru } from "date-fns/locale";
import { IOrdersElement, TIngredient } from '../../utils/types';

const OrdersElement: FC<IOrdersElement> = ({data}) => {
  const createdAt = formatRelative(new Date(data.createdAt), new Date(), { locale: ru });
  const {ingredients} = useSelector(store => store.ingredients);
  const location = useLocation();
  const orderIngredients = useMemo(() =>
    data.ingredients.map((id: string) => {
      return ingredients.find((item) => {
        return item._id === id
      })
    }),
    [data.ingredients, ingredients]
  );
  const uniqueOrderIngredients = [...new Set(orderIngredients)];
  const totalPrice = useMemo(() =>
    orderIngredients.reduce((acc: number, item: TIngredient | undefined) => {
      if (item) {
        return acc + item?.price
      }
      return acc
    }, 0),
    [orderIngredients]);

  return (
    <Link to={{pathname: `/feed/${data._id}`, state: { from: location }}} className={styles.order}>
      <CellEmpty height="mt-6"/>
      <div className={styles.info}>
        <p className={`${styles.number} text text_type_digits-default`}>{`#0${data.number}`}</p>
        <p className={`${styles.date} text text_type_main-default text_color_inactive`}>{createdAt}</p>
      </div>
      <p className={`${styles.title} text text_type_main-medium mt-6 mb-6`}>{data.name}</p>
      <div className={styles.content}>
        <div className={styles.images}>
          {uniqueOrderIngredients.map((item: any, i: number) => (
            <div key={item?._id} className={styles.frame} style={i>5 ? {'display': 'none'} : {'zIndex': 6-i}}>
              <img className={styles.image} src={item?.image_mobile} alt={item?.name}/>
              <p className={`${styles.image_text} text text_type_main-default`} style={(i===5 && uniqueOrderIngredients.length>6) ? {} : {'display': 'none'}}>{`+${uniqueOrderIngredients.length-6}`}</p>
            </div>
          ))}
        </div>
        <div className={styles.price}>
          <p className={`${styles.number} text text_type_digits-default`}>{totalPrice}</p>
          <CellEmpty height="ml-2"/>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <CellEmpty height="mt-6"/>
    </Link>
  );
}

export default OrdersElement;
