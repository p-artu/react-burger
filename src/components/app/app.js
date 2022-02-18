import React, { useEffect } from 'react';
import app from './app.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsContext } from '../../contexts/ingredientsContext.js';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/index';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const data = useSelector(store => store.reducer.ingredients);
  const { currentIngredient, isModalOpen } = useSelector(store => store.reducer);
  // const [data, setData] = useState([]);
//   const [{ currentIngredient, modalTitle, isModalOpen }, modalDispatcher] = useReducer(reducer, {
//     currentIngredient: {},
//     modalTitle: '',
//     isModalOpen: false,
//  });

  // useEffect(() => {
  //   dispatch(getIngredients());
  //   // BurgersApi.getIngredientsRequest()
  //   // .then(({data}) => {
  //   //   setData(data);
  //   // })
  //   // .catch(err => {
  //   //   console.error(err);
  //   // });
  // }, []);

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case 'modal':
  //       return {
  //         ...state,
  //         currentIngredient: action.payload.ingredient,
  //         modalTitle: action.payload.title,
  //         isModalOpen: action.payload.isModalOpen
  //       }
  //     default:
  //       return state
  //   }
  // }
  // function handleOpenIngredientModal(data) {
  //   dispatch({
  //     type: OPEN_INGREDIENT_MODAL,
  //     payload: {
  //       ingredient: data,
  //       title: 'Детали ингредиента'
  //     }
  //   });
  //   // modalDispatcher({
  //   //   type: 'modal',
  //   //   payload: {
  //   //     ingredient: data,
  //   //     title: 'Детали ингредиента',
  //   //     isModalOpen: true
  //   //   }
  //   // });
  // }
  // function handleOpenOrderModal(dataIds) {
  //   BurgersApi.getNumberRequest(dataIds)
  //   .then((id) => {
  //     console.log(id);
  //     modalDispatcher({
  //       type: 'modal',
  //       payload: {
  //         ingredient: {},
  //         title: id.order.number.toString(),
  //         isModalOpen: true
  //       }
  //     });
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
  // }
  // function handleCloseModal() {
  //   dispatch({
  //     type: CLOSE_MODAL
  //   });
  //   // modalDispatcher({
  //   //   type: 'modal',
  //   //   payload: {
  //   //     ingredient: {},
  //   //     title: '',
  //   //     isModalOpen: false
  //   //   }
  //   // });
  // }

  return (
    <IngredientsContext.Provider value={data}>
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
    </IngredientsContext.Provider>
  );
}

export default App;
