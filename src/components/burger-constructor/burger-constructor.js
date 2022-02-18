import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { getNumber, ADD_INGREDIENT, DELETE_INGREDIENT, INCREASE_COUNTER, REDUCE_COUNTER } from '../../services/actions/index';
import EmptyBurgerIngredients from '../empty-burger-ingredients/empty-burger-ingredients';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const data = useSelector(store => store.reducer.draggedIngredients);
  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      let uniqueItem = {...item};
      if (uniqueItem.type !== 'bun') {
        const now = new Date().getTime();
        uniqueItem.unId = now;
      }
      dispatch({
        type: ADD_INGREDIENT,
        item: uniqueItem
      });
      if (uniqueItem.type !== 'bun') {
        dispatch({
          type: INCREASE_COUNTER,
          item: uniqueItem
        });
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });
  const border = isHover ? 'red dashed 1px' : '';
  const totalPrice = useMemo(() => {
    const fillingPrice = data.content.reduce((acc, item) => {
      return acc + item.price
    }, 0);
    let bunsPrice = 0;
    if (data.bun.price) {
      bunsPrice = 2 * data.bun.price;
    }
    return fillingPrice + bunsPrice
  }, [data]);

  function openModal() {
    const dataIds = data.map(item => item._id);
    dispatch(getNumber(dataIds));
  }
  function deleteIngredient(item) {
    dispatch({
      type: DELETE_INGREDIENT,
      unId: item.unId,
    });
    dispatch({
      type: REDUCE_COUNTER,
      item: item
    });
  }

  return (
    <div className={styles.construct}>
      <CellEmpty height="pt-25"/>
      {(!!data.bun.name || !!data.content.length) ?
        <div ref={dropTarget} className={styles.list}>
          {!!data.bun.name ?
            <div className={styles.buns}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={data.bun.name + ' (верх)'}
                price={data.bun.price}
                thumbnail={data.bun.image}
              />
            </div>
          :
            <div style={{border}} className={styles.emptyBunTop}></div>
          }
          <CellEmpty height="mt-4"/>
          <div style={{border}} className={styles.content}>
            {data.content.map((item) => {
              if (item.type !== "bun") {
                return (<div className={styles.element} key={item.unId}>
                  <CellEmpty height="ml-4"/>
                  <DragIcon type="primary"/>
                  <CellEmpty height="ml-2"/>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => deleteIngredient(item)}
                  />
                </div>)
              }
              return null
            })}
          </div>
          <CellEmpty height="mt-4"/>
          {!!data.bun.name ?
            <div className={styles.buns}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={data.bun.name + ' (низ)'}
                price={data.bun.price}
                thumbnail={data.bun.image}
              />
            </div>
          :
            <div style={{border}} className={styles.emptyBunBottom}></div>
          }
        </div>
      :
        <EmptyBurgerIngredients />
      }
      <CellEmpty height="pt-10"/>
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

export default BurgerConstructor;
