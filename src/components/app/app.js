import React, { useState, useEffect, useReducer } from 'react';
import app from './app.module.css';
import {BurgersApi} from '../../utils/BurgersApi.js';
import CellEmpty from '../cell-empty/cell-empty';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsContext } from '../../contexts/ingredientsContext.js';

function App() {
  const [data, setData] = useState([]);
  const [{ currentIngredient, modalTitle, isModalOpen }, modalDispatcher] = useReducer(reducer, {
    currentIngredient: {},
    modalTitle: '',
    isModalOpen: false,
 });

  useEffect(() => {
    BurgersApi.getIngredients()
    .then(({data}) => {
      setData(data);
    })
    .catch(err => {
      console.error(err);
    });
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case 'modal':
        return {
          ...state,
          currentIngredient: action.payload.ingredient,
          modalTitle: action.payload.title,
          isModalOpen: action.payload.isModalOpen
        }
      default:
        return state
    }
  }
  function handleOpenIngredientModal(data) {
    modalDispatcher({
      type: 'modal',
      payload: {
        ingredient: data,
        title: 'Детали ингредиента',
        isModalOpen: true
      }
    });
  }
  function handleOpenOrderModal(dataIds) {
    BurgersApi.getNumber(dataIds)
    .then((id) => {
      modalDispatcher({
        type: 'modal',
        payload: {
          ingredient: {},
          title: id.order.number.toString(),
          isModalOpen: true
        }
      });
    })
    .catch(err => {
      console.error(err);
    });
  }
  function handleCloseModal() {
    modalDispatcher({
      type: 'modal',
      payload: {
        ingredient: {},
        title: '',
        isModalOpen: false
      }
    });
  }

  return (
    <IngredientsContext.Provider value={data}>
      <div className={app.page}>
        <AppHeader />
        {!!data.length &&
          <main className={app.main}>
            <BurgerIngredients openModal={handleOpenIngredientModal}/>
            <BurgerConstructor openModal={handleOpenOrderModal}/>
          </main>}
        <CellEmpty height="mb-3"/>
        {isModalOpen &&
          <Modal title={modalTitle} closePopup={handleCloseModal}>
            {currentIngredient.name ? <IngredientDetails data={currentIngredient}/> : <OrderDetails/>}
          </Modal>
        }
      </div>
    </IngredientsContext.Provider>
  );
}

export default App;
