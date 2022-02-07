import React from 'react';
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
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});
  const [modalTitle, setModalTitle] = React.useState('');

  React.useEffect(() => {
    BurgersApi.getIngredients()
    .then(({data}) => {
      setData(data);
    })
    .catch(err => {
      console.error(err);
    });
  }, []);

  function handleOpenIngredientModal(data) {
    setVisible(true);
    setCurrentIngredient(data);
    setModalTitle('Детали ингредиента');
  }
  function handleOpenOrderModal(dataId) {
    // try {
    //   const id = await BurgersApi.getNumber(dataId);
    //   setModalTitle(id.order.number.toString());
    // } catch(err) {
    //   console.error(err);
    // } finally {
    //   setVisible(true);
    // }
    BurgersApi.getNumber(dataId)
    .then((id) => {
      setModalTitle(id.order.number.toString());
      setVisible(true);
    })
    .catch(err => {
      console.error(err);
    });
  }
  function handleCloseModal() {
    setVisible(false);
    setCurrentIngredient({});
    setModalTitle('');
  }

  return (
    <IngredientsContext.Provider value={data}>
      <div className={app.page}>
        <AppHeader />
        {!!data.length &&
          <main className={app.main}>
            <BurgerIngredients openModal={handleOpenIngredientModal} data={data}/>
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
