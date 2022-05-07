import React, { useRef } from 'react';
import styles from './orders-list.module.css';
import OrdersElement from '../orders-element/orders-element';
import { useSelector } from '../../services/hooks';
import { TAllOrdersArr} from '../../utils/types';

function OrdersList() {
  const { allOrders, wsError } = useSelector(store => store.order);
  const ingredientsRef = useRef<HTMLUListElement>(null);

  return (
    <div className={styles.orders_container}>
      {!wsError && !allOrders?.orders?.length &&
        <h1 className="text text_type_main-large mt-7">Идёт загрузка...</h1>
      }
      {wsError && !allOrders?.orders?.length &&
        <h1 className={`text text_type_main-large mt-7 ${styles.error}`}>Произошла ошибка! Попробуйте перезагрузить.</h1>
      }
      {!!allOrders?.orders?.length &&
      <>
        <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
        <ul className={styles.orders} ref={ingredientsRef}>
          {allOrders !== null &&
          allOrders.orders.map((item: TAllOrdersArr) => (
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
