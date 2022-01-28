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
import {orderID} from '../../utils/constants';

class App extends React.Component {
  state = {
    data: [],
    visible: false,
    modalData: {}
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

  handleOpenModal = (data) => {
    if (data.type === 'submit') {
      this.setState({ ...this.state, visible: true, modalData: {} });
    } else {
      this.setState({ ...this.state, visible: true, modalData: data });
    }
  }
  handleCloseModal = () => {
    this.setState({ ...this.state, visible: false, modalData: {} });
  }

  render() {
    return (
      <div className={app.page}>
        <AppHeader />
        {!!this.state.data.length &&
          <main className={app.main}>
            <BurgerIngredients openModal={this.handleOpenModal} data={this.state.data}/>
            <BurgerConstructor openModal={this.handleOpenModal} data={this.state.data}/>
          </main>}
        <CellEmpty height="mb-3"/>
        {this.state.visible &&
          <Modal closePopup={this.handleCloseModal}>
            {this.state.modalData.name ? <IngredientDetails data={this.state.modalData}/> : <OrderDetails data={orderID}/>}
          </Modal>
        }
      </div>
    );
  }
}

export default App;
