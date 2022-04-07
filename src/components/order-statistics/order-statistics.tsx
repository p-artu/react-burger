import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './order-statistics.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { useSelector, useDispatch } from '../../services/hooks';
import { getNumber } from '../../services/actions';
import { TAllOrdersArr } from '../../utils/types';

const OrderStatistics = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector(store => store.constructorIngredients.draggedIngredients);
  const user = useSelector(store => store.user.user);
  const { allOrders } = useSelector(store => store.order);
  const [readyOrder, pendingOrder] = useMemo(() =>
    allOrders.orders.reduce((arr: TAllOrdersArr[][], item: TAllOrdersArr) => {
      if (item.status === 'done' && arr[0].length < 20) {
        arr[0].push(item);
        return arr
      }
      if (item.status === 'pending' && arr[1].length < 20) {
        arr[1].push(item);
        return arr
      }
      return arr
    }, [[], []]),
    [allOrders]
  );

  function openModal() {
    if (user.name !== '') {
      const dataIds = data.content.map(item => item._id);
      dispatch(getNumber(dataIds));
    } else {
      history.push('/login');
    }
  }

  return (
    <div className={styles.stat}>
      <div className={styles.orders}>
        <div className={styles.orders_column}>
          <h2 className={`${styles.title} text text_type_main-medium mb-4`}>Готовы:</h2>
          <ul className={styles.list}>
            {readyOrder.map((item: any, i: any) => (
              <li key={item._id} className={styles.list_item}>
                <p className={`${styles.number} text text_type_digits-default mt-2`}>{`0${item.number}`}</p>
              </li>
            ))}
          </ul>
        </div>
        <CellEmpty height="ml-9"/>
        <div className={styles.orders_column}>
          <h2 className={`${styles.title} text text_type_main-medium mb-4`}>В работе:</h2>
          <ul className={styles.list}>
            {pendingOrder.map((item: any, i: any) => (
              <li key={item._id} className={styles.list_item}>
                <p className={`text text_type_digits-default mt-2`}>{`0${item.number}`}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h2 className={`${styles.title} text text_type_main-medium mt-15`}>Выполнено за все время:</h2>
      <p className={`text text_type_digits-large ${styles.shadow}`}>{allOrders?.total}</p>
      <h2 className={`${styles.title} text text_type_main-medium mt-15`}>Выполнено за сегодня:</h2>
      <p className={`text text_type_digits-large ${styles.shadow}`}>{allOrders?.totalToday}</p>
    </div>
  );
}

export default OrderStatistics;
