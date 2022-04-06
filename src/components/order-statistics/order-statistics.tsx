import React, { useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './order-statistics.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import { getNumber, moveIngredient } from '../../services/actions';
import EmptyBurgerIngredients from '../empty-burger-ingredients/empty-burger-ingredients';
import ToppingElement from '../topping-element/topping-element';
import { TIngredient } from '../../utils/types';

const OrderStatistics = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector(store => store.constructorIngredients.draggedIngredients);
  const user = useSelector(store => store.user.user);
  const {orderRequest} = useSelector(store => store.order);
  const {orderFailed} = useSelector(store => store.order);
  const totalPrice = useMemo(() => {
    const fillingPrice = data.content.reduce((acc: number, item: TIngredient) => {
      return acc + item.price
    }, 0);
    let bunsPrice = 0;
    if (data.bun !== null && data.bun.price !== 0) {
      bunsPrice = 2 * data.bun.price;
    }
    return fillingPrice + bunsPrice
  }, [data]);

  function openModal() {
    if (user.name !== '') {
      const dataIds = data.content.map(item => item._id);
      dispatch(getNumber(dataIds));
    } else {
      history.push('/login');
    }
  }
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    dispatch(moveIngredient(dragIndex, hoverIndex));
  }, [])
  const renderCard = useCallback((item, index) => {
    return (
      <ToppingElement
        key={item.unId}
        id={item.unId}
        index={index}
        item={item}
        moveCard={moveCard}
      />
    )
  }, [])

  return (
    <div className={styles.stat}>
      <div className={styles.orders}>
        <div className={styles.orders_column}>
          <h2 className={`${styles.title} text text_type_main-medium mb-4`}>Готовы:</h2>
          <ul className={styles.list}>
            <li className={styles.list_item}>
              <p className={`${styles.number} text text_type_digits-default mt-2`}>034533</p>
            </li>
            <li className={styles.list_item}>
              <p className={`${styles.number} text text_type_digits-default mt-2`}>034533</p>
            </li>
            <li className={styles.list_item}>
              <p className={`${styles.number} text text_type_digits-default mt-2`}>034533</p>
            </li>
          </ul>
        </div>
        <CellEmpty height="ml-9"/>
        <div className={styles.orders_column}>
          <h2 className={`${styles.title} text text_type_main-medium mb-4`}>В работе:</h2>
          <ul className={styles.list}>
            <li className={styles.list_item}>
              <p className={`${styles.number} text text_type_digits-default mt-2`}>034533</p>
            </li>
            <li className={styles.list_item}>
              <p className={`${styles.number} text text_type_digits-default mt-2`}>034533</p>
            </li>
            <li className={styles.list_item}>
              <p className={`${styles.number} text text_type_digits-default mt-2`}>034533</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderStatistics;
