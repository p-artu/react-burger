import React, { useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './burger-constructor.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import { useDrop } from "react-dnd";
import { getNumber, addIngredient, increaseCounter, moveIngredient } from '../../services/actions';
import EmptyBurgerIngredients from '../empty-burger-ingredients/empty-burger-ingredients';
import ToppingElement from '../topping-element/topping-element';
import { TIngredient } from '../../utils/types';

const BurgerConstructor = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector(store => store.constructorIngredients.draggedIngredients);
  const user = useSelector(store => store.user.user);
  const {orderRequest} = useSelector(store => store.order);
  const {orderFailed} = useSelector(store => store.order);
  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      let uniqueItem: TIngredient = {...item};
      if (uniqueItem.type !== 'bun') {
        const now = new Date().getTime();
        uniqueItem.unId = now;
      }
      dispatch(addIngredient(uniqueItem));
      if (uniqueItem.type !== 'bun') {
        dispatch(increaseCounter(uniqueItem));
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });
  const border = isHover ? 'red dashed 1px' : '';
  const totalPrice = useMemo(() => {
    const fillingPrice = data.content.reduce((acc: number, item: TIngredient) => {
      return acc + item.price
    }, 0);
    let bunsPrice = 0;
    if (data.bun !== null && data.bun.price !== 0) {
      bunsPrice = 2 * data.bun.price;
    }
    return fillingPrice + bunsPrice
  }, [data]);

  function openModal() {
    if (user.name !== '') {
      const dataIds = data.content.map(item => item._id);
      if (data.bun !== null) {
        dataIds.push(data.bun._id);
        dataIds.push(data.bun._id);
      }
      dispatch(getNumber(dataIds));
    } else {
      history.push('/login');
    }
  }
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    dispatch(moveIngredient(dragIndex, hoverIndex));
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
      {(data.bun !== null || !!data.content.length) ?
        <div ref={dropTarget} className={styles.list}>
          {data.bun !== null ?
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
            {data.content.map((item, i: number) => renderCard(item, i))}
          </div>
          <CellEmpty height="mt-4"/>
          {data.bun !== null ?
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
        (data?.bun !== null || !!data?.content?.length) &&
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
            {data?.bun !== null && !!data.content.length &&
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
