import React from 'react';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../utils/types';
import styles from './burger-constructor.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }

  openModal = (e) => {
    this.props.openModal(e.target);
  }

  render() {
    return (
      <div className={styles.construct}>
        <CellEmpty height="mt-25"/>
        <div className={styles.list}>
          <div className={styles.buns}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={this.data[0].name + ' (верх)'}
              price={this.data[0].price}
              thumbnail={this.data[0].image}
            />
          </div>
          <CellEmpty height="mt-4"/>
          <div className={styles.content}>
            {this.data.map((item) => {
              if (item.type !== "bun") {
                return (<div className={styles.element} key={item._id}>
                  <CellEmpty height="ml-4"/>
                  <DragIcon type="primary"/>
                  <CellEmpty height="ml-2"/>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>)
              }
              return null
            })}
          </div>
          <CellEmpty height="mt-4"/>
          <div className={styles.buns}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={this.data[0].name + ' (низ)'}
              price={this.data[0].price}
              thumbnail={this.data[0].image}
            />
          </div>
        </div>
        <CellEmpty height="mt-10"/>
        <div className={styles.order}>
          <div className={styles.total}>
            <p className="text text_type_digits-medium">
              {this.data.reduce((a, b) => {
                return a + b.price
              }, 0)}
            </p>
            <CellEmpty height="ml-2"/>
            <div className={styles.icon}>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
          <CellEmpty height="ml-10"/>
          <Button type="primary" size="large" onClick={(e) => this.openModal(e)}>
            Оформить заказ
          </Button>
          <CellEmpty height="ml-4"/>
        </div>
      </div>
    );
  }
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
};

export default BurgerConstructor;
