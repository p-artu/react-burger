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
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [modalTitle, setModalTitle] = useState('');
  const [visible, visibleDispatcher] = useReducer(reducer, false);

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
    setCurrentIngredient(action.ingredient);
    setModalTitle(action.title);
    return action.isOpen
  }
  function handleOpenIngredientModal(data) {
    visibleDispatcher({ ingredient: data, title: 'Детали ингредиента', isOpen: true });
  }
  function handleOpenOrderModal(dataIds) {
    BurgersApi.getNumber(dataIds)
    .then((id) => {
      visibleDispatcher({ ingredient: {}, title: id.order.number.toString(), isOpen: true });
    })
    .catch(err => {
      console.error(err);
    });
  }
  function handleCloseModal() {
    visibleDispatcher({ ingredient: {}, title: '', isOpen: false });
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
        {visible &&
          <Modal title={modalTitle} closePopup={handleCloseModal}>
            {currentIngredient.name ? <IngredientDetails data={currentIngredient}/> : <OrderDetails/>}
          </Modal>
        }
      </div>
    </IngredientsContext.Provider>
  );
}

export default App;
