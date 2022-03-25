import React, { useMemo, useCallback, FC } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './burger-constructor.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { getNumber } from '../../services/actions/order';
import { addIngredient, increaseCounter, moveIngredient } from '../../services/actions/constructor-ingredients';
import EmptyBurgerIngredients from '../empty-burger-ingredients/empty-burger-ingredients';
import ToppingElement from '../topping-element/topping-element';

type TUser = {
  name: string;
};
type TContent = {
  _id: string;
  price: number;
  image: string;
  name: string;
  type: string;
  unId: number;
};
type TData = {
  content: TContent[];
  bun: TContent;
};
type TDataStore = {
  constructorIngredients: {
    draggedIngredients: TData;
  };
};
type TUserStore = {
  user: {
    user: TUser;
  };
};
type TOrder = {
  order: {
    orderRequest: object;
    orderFailed: object;
  };
};
const BurgerConstructor: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data: TData = useSelector<TDataStore, TData>(store => store.constructorIngredients.draggedIngredients);
  const user: TUser = useSelector<TUserStore, TUser>(store => store.user.user);
  const orderRequest = useSelector<TOrder>(store => store.order.orderRequest);
  const orderFailed = useSelector<TOrder>(store => store.order.orderFailed);
  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TContent) {
      let uniqueItem: TContent = {...item};
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
    const fillingPrice = data.content.reduce((acc: number, item: TContent) => {
      return acc + item.price
    }, 0);
    let bunsPrice = 0;
    if (data.bun.price) {
      bunsPrice = 2 * data.bun.price;
    }
    return fillingPrice + bunsPrice
  }, [data]);

  function openModal() {
    if (user.name) {
      const dataIds = data.content.map(item => item._id);
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
            {data.content.map((item, i: number) => renderCard(item, i))}
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
