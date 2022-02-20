import React from 'react';
import app from './app.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CLOSE_INGREDIENT_MODAL } from '../../services/actions/ingredient-modal';
import { CLOSE_ORDER_MODAL } from '../../services/actions/order';

function App() {
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
    <div className={app.page}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={app.main}>
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
    </div>
  );
}

export default App;
