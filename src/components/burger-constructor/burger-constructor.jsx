import React, { useMemo, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { getNumber } from '../../services/actions/order';
import { ADD_INGREDIENT, INCREASE_COUNTER, MOVE_INGREDIENT } from '../../services/actions/constructor-ingredients';
import EmptyBurgerIngredients from '../empty-burger-ingredients/empty-burger-ingredients';
import ToppingElement from '../topping-element/topping-element';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const data = useSelector(store => store.constructorIngredients.draggedIngredients);
  const {orderRequest, orderFailed} = useSelector(store => store.order);
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
    const dataIds = data.content.map(item => item._id);
    dispatch(getNumber(dataIds));
  }
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_INGREDIENT,
      dragIndex,
      hoverIndex
    });
  }, [])
  const renderCard = useCallback((item, index) => {
    return (
      <ToppingElement
        key={item.unId}
        id={item.unId}
        index={index}
        item={item}
        moveCard={moveCard}
      />
    )
  }, [])

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
            {data.content.map((item, i) => renderCard(item, i))}
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
      {orderRequest ?
        <h2 className="text text_type_main-medium">Идёт загрузка...</h2>
      :
        (!!data.bun.price || !!data.content.length) &&
        <>
          {orderFailed &&
            <>
              <h2 className={`text text_type_main-medium ${styles.error}`}>Произошла ошибка! Попробуйте ещё раз!</h2>
              <CellEmpty height="pt-10"/>
            </>
          }
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
            {!!data.bun.price && !!data.content.length &&
            <Button type="primary" size="large" onClick={openModal}>
              Оформить заказ
            </Button>}
            <CellEmpty height="ml-4"/>
          </div>
        </>
      }
    </div>
  );
}

export default BurgerConstructor;
