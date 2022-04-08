import React, { useRef, useEffect } from 'react';
import styles from './my-orders-list.module.css';
import MyOrdersElement from '../my-orders-element/my-orders-element';
import { useSelector, useDispatch } from '../../services/hooks';
import { getAllMyOrders } from '../../services/actions';

function MyOrdersList() {
  const dispatch = useDispatch();
  const { allMyOrders, allMyOrdersRequest, allMyOrdersFailed } = useSelector(store => store.order);
  const ingredientsRef = useRef<HTMLUListElement>(null);
  const MyOrders = allMyOrders.orders.slice(0).reverse();

  useEffect(() => {
    dispatch(getAllMyOrders());
  }, []); 

  return (
    <div className={styles.orders_container}>
      {allMyOrdersRequest &&
        <h1 className="text text_type_main-large mt-7">Идёт загрузка...</h1>
      }
      {allMyOrdersFailed && !allMyOrders.orders.length &&
        <h1 className={`text text_type_main-large mt-7 ${styles.error}`}>Произошла ошибка! Попробуйте перезагрузить.</h1>
      }
      {!!allMyOrders.orders.length &&
      <>
        <ul className={styles.orders} ref={ingredientsRef}>
          {allMyOrders !== null &&
          MyOrders.map((item: any) => (
            <li className={styles['ingredients-item']} key={item._id}>
              <MyOrdersElement
                data={item}
              />
            </li>
          ))}
        </ul>
      </>}
    </div>
  );
}

export default MyOrdersList;
