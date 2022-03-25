import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CellEmpty from '../components/cell-empty/cell-empty';
import Modal from '../components/modal/modal';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import OrderDetails from '../components/order-details/order-details';
import { closeOrderModal } from '../services/actions/order';
import styles from './home.module.css';

type TOrder = {
  orderDetails: string;
};
type TOrderStore = {
  order: TOrder;
};
function HomePage() {
  const dispatch = useDispatch();
  const { orderDetails } = useSelector<TOrderStore, TOrder>(store => store.order);

  function closeOrderPopup() {
    dispatch(closeOrderModal());
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients/>
          <BurgerConstructor/>
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

export default HomePage;
