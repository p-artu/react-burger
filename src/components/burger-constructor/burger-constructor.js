import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }

  render() {
    return (
      <div className={styles.construct}>
        <CellEmpty height="mt-25"/>
        <div className={styles.list}>
          <div style={{marginRight: 16, width: 536, display: 'flex'}}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={this.data[0].name}
              price={this.data[0].price}
              thumbnail={this.data[0].image}
            />
          </div>
          <CellEmpty height="mt-4"/>
          <div className={styles.content}>
            {this.data.map((item) => (
              <div className={styles.element}>
                <CellEmpty height="ml-4"/>
                <DragIcon type="primary"/>
                <CellEmpty height="ml-2"/>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  key={item._id}
                />
              </div>
            ))}
          </div>
          <CellEmpty height="mt-4"/>
          <div style={{marginRight: 16, width: 536, display: 'flex'}}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={this.data[0].name}
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
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
          <CellEmpty height="ml-4"/>
        </div>
      </div>
    );
  }
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  }).isRequired).isRequired
};

export default BurgerConstructor;
