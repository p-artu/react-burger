import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../contexts/ingredientsContext.js';

function BurgerConstructor(props) {
  const data = useContext(IngredientsContext);
  const bun = useMemo(() => data.find((item) => item.type === "bun"), [data]);
  const totalPrice = useMemo(() => {
    const fillingPrice = data.reduce((acc, item) => {
      if (item.type !== "bun") {
        return acc + item.price
      }
      return acc
    }, 0);
    const bunsPrice = 2 * bun.price;
    return fillingPrice + bunsPrice
  }, [data, bun]);

  function openModal() {
    const dataIds = data.map(item => item._id);
    props.openModal(dataIds);
  }

  return (
    <div className={styles.construct}>
      <CellEmpty height="mt-25"/>
      <div className={styles.list}>
        <div className={styles.buns}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <CellEmpty height="mt-4"/>
        <div className={styles.content}>
          {data.map((item) => {
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
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <CellEmpty height="mt-10"/>
      <div className={styles.order}>
        <div className={styles.total}>
          <p className="text text_type_digits-medium">
            {totalPrice}
          </p>
          <CellEmpty height="ml-2"/>
          <div className={styles.icon}>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
        <CellEmpty height="ml-10"/>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
        <CellEmpty height="ml-4"/>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;
