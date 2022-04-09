import React from 'react';
import OrdersList from '../components/orders-list/orders-list';
import OrderStatistics from '../components/order-statistics/order-statistics';
import styles from './order-feed.module.css';

function OrderFeedPage() {
  return (
    <main className={styles.main}>
      <OrdersList/>
      <OrderStatistics/>
    </main>
  );
}

export default OrderFeedPage;
