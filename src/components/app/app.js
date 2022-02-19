import React from 'react';
import app from './app.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { currentIngredient, isModalOpen } = useSelector(store => store.reducer);

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
      {isModalOpen &&
        <Modal>
          {currentIngredient.name ? <IngredientDetails/> : <OrderDetails/>}
        </Modal>
      }
    </div>
  );
}

export default App;
