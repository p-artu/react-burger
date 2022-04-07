import React, { useMemo, useRef } from 'react';
import styles from './orders-list.module.css';
import OrdersElement from '../orders-element/orders-element';
import { useSelector } from '../../services/hooks';
import { TIngredient } from '../../utils/types';

function OrdersList() {
  const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(store => store.ingredients);
  const { allOrders } = useSelector(store => store.order);
  const [bun, sauce, main] = useMemo(() =>
    ingredients.reduce((arr: TIngredient[][], item: TIngredient) => {
      if (item.type === 'bun') {
        arr[0].push(item);
        return arr
      }
      if (item.type === 'sauce') {
        arr[1].push(item);
        return arr
      }
      if (item.type === 'main') {
        arr[2].push(item);
        return arr
      }
      return arr
    }, [[], [], []]),
    [ingredients]
  );
  const ingredientsRef = useRef<HTMLUListElement>(null);

  return (
    <div className={styles.orders_container}>
      {ingredientsRequest &&
        <h1 className="text text_type_main-large">Идёт загрузка...</h1>
      }
      {ingredientsFailed && !ingredients.length &&
        <h1 className={`text text_type_main-large ${styles.error}`}>Произошла ошибка! Попробуйте перезагрузить.</h1>
      }
      {!!ingredients.length &&
      <>
        <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
        <ul className={styles.orders} ref={ingredientsRef}>
          {allOrders !== null &&
          allOrders.orders.map((item: any) => (
            <li className={styles['ingredients-item']} key={item._id}>
              <OrdersElement
                data={item}
              />
            </li>
          ))}
        </ul>
      </>}
    </div>
  );
}

export default OrdersList;
