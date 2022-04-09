import React, {useEffect} from 'react';
import { useDispatch } from '../services/hooks';
import OrdersList from '../components/orders-list/orders-list';
import OrderStatistics from '../components/order-statistics/order-statistics';
import styles from './order-feed.module.css';
import { WSConnectionStart, WSConnectionClosed} from '../services/actions';

function OrderFeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(WSConnectionStart('/all'));
    return () => {
      dispatch(WSConnectionClosed());
    };
  }, []);

  return (
    <main className={styles.main}>
      <OrdersList/>
      <OrderStatistics/>
    </main>
  );
}

export default OrderFeedPage;
