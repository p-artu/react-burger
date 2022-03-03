import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CellEmpty from '../components/cell-empty/cell-empty';
import Modal from '../components/modal/modal';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import OrderDetails from '../components/order-details/order-details';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { CLOSE_INGREDIENT_MODAL } from '../services/actions/ingredient-modal';
import { CLOSE_ORDER_MODAL } from '../services/actions/order';
import styles from './home.module.css';

function HomePage() {
  const dispatch = useDispatch();
  const { currentIngredient } = useSelector(store => store.ingredientModal);
  const { orderDetails } = useSelector(store => store.order);

  function closeIngredientPopup() {
    dispatch({ type: CLOSE_INGREDIENT_MODAL });
  }
  function closeOrderPopup() {
    dispatch({ type: CLOSE_ORDER_MODAL });
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
      {currentIngredient &&
        <Modal closePopup={closeIngredientPopup}>
          <IngredientDetails/>
        </Modal>}
      {orderDetails &&
        <Modal closePopup={closeOrderPopup}>
          <OrderDetails/>
        </Modal>}
    </>
  );
}

export default HomePage;
