import React from 'react';
import app from './app.module.css';
import {IngredientsApi} from '../../utils/IngredientsApi.js';
import CellEmpty from '../cell-empty/cell-empty';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {ORDER_ID} from '../../utils/constants';

class App extends React.Component {
  state = {
    data: [],
    visible: false,
    currentIngredient: {},
    modalTitle: ''
  };

  componentDidMount() {
    IngredientsApi.getIngredients()
    .then(({data}) => {
      this.setState({
        ...this.state,
        data: data
      });
    })
    .catch(err => {
      console.error(err);
    });
  }

  handleOpenIngredientModal = (data) => {
    this.setState({ ...this.state, visible: true, currentIngredient: data, modalTitle: 'Детали ингредиента' });
  }
  handleOpenOrderModal = () => {
    this.setState({ ...this.state, visible: true, modalTitle: ORDER_ID });
  }
  handleCloseModal = () => {
    this.setState({ ...this.state, visible: false, currentIngredient: {}, modalTitle: '' });
  }

  render() {
    return (
      <div className={app.page}>
        <AppHeader />
        {!!this.state.data.length &&
          <main className={app.main}>
            <BurgerIngredients openModal={this.handleOpenIngredientModal} data={this.state.data}/>
            <BurgerConstructor openModal={this.handleOpenOrderModal} data={this.state.data}/>
          </main>}
        <CellEmpty height="mb-3"/>
        {this.state.visible &&
          <Modal title={this.state.modalTitle} closePopup={this.handleCloseModal}>
            {this.state.currentIngredient.name ? <IngredientDetails data={this.state.currentIngredient}/> : <OrderDetails/>}
          </Modal>
        }
      </div>
    );
  }
}

export default App;
