import React, { useRef, useEffect } from 'react';
import styles from './my-orders-list.module.css';
import MyOrdersElement from '../my-orders-element/my-orders-element';
import { useSelector, useDispatch } from '../../services/hooks';
import { WSConnectionMyStart } from '../../services/actions';

function MyOrdersList() {
  const dispatch = useDispatch();
  const { allMyOrders, wsMyConnected, wsMyError } = useSelector(store => store.order);
  const ingredientsRef = useRef<HTMLUListElement>(null);
  const MyOrders = allMyOrders.orders && allMyOrders.orders.slice(0).reverse();

  useEffect(() => {
    const accessToken: any = localStorage.getItem('accessToken');
    const authToken = accessToken && accessToken.split('Bearer ')[1];
    dispatch(WSConnectionMyStart(`?token=${authToken}`));
  }, []); 

  return (
    <div className={styles.orders_container}>
      {wsMyConnected && !allMyOrders?.orders?.length &&
        <h1 className="text text_type_main-large mt-7">Идёт загрузка...</h1>
      }
      {wsMyError && !allMyOrders?.orders?.length &&
        <h1 className={`text text_type_main-large mt-7 ${styles.error}`}>Произошла ошибка! Попробуйте перезагрузить.</h1>
      }
      {!!allMyOrders?.orders?.length &&
      <>
        <ul className={styles.orders} ref={ingredientsRef}>
          {allMyOrders !== null &&
          MyOrders.map((item: any) => (
            <li className={styles['ingredients-item']} key={item?._id}>
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
