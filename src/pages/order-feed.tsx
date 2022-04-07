import React, {useEffect} from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getAllOrders } from '../services/actions';
import CellEmpty from '../components/cell-empty/cell-empty';
import Modal from '../components/modal/modal';
import OrdersList from '../components/orders-list/orders-list';
import OrderStatistics from '../components/order-statistics/order-statistics';
import OrderDetails from '../components/order-details/order-details';
import { closeOrderModal } from '../services/actions';
import styles from './order-feed.module.css';

function OrderFeedPage() {
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(store => store.order);

 useEffect(() => {
    dispatch(getAllOrders());
  }, []); 

  function closeOrderPopup() {
    dispatch(closeOrderModal());
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <OrdersList/>
          <OrderStatistics/>
        </main>
      </DndProvider>
      <CellEmpty height="mb-3"/>
      {orderDetails &&
        <Modal closePopup={closeOrderPopup}>
          <OrderDetails/>
        </Modal>}
    </>
  );
}

export default OrderFeedPage;
