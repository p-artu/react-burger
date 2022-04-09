import React, {useMemo, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import styles from './my-ingredient-details-detailed.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { WSConnectionMyStart, WSConnectionMyClosed } from '../../services/actions';
import { useSelector, useDispatch } from '../../services/hooks';
import { formatRelative } from 'date-fns';
import { ru } from "date-fns/locale";
import { TIngredient } from '../../utils/types';

function MyOrderDetailsDetailed() {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const { allMyOrders, wsMyConnected, wsMyError } = useSelector(store => store.order);
  const {ingredients} = useSelector(store => store.ingredients);
  const {id}: {id: string} = useParams();
  const currentOrder = allMyOrders.orders.find(item => item._id === id);
  const createdAt = currentOrder && formatRelative(new Date(currentOrder.createdAt), new Date(), { locale: ru });
  const orderIngredients = useMemo(() =>
    currentOrder?.ingredients.map((id: string) => {
      return ingredients.find((item) => {
        return item._id === id
      })
    }),
    [currentOrder?.ingredients, ingredients]
  );
  const uniqueOrderIngredients = [...new Set(orderIngredients)];
  const uniqueOrderIngredientsQuantity = useMemo(() => {
    return uniqueOrderIngredients.map((item) => {
      if (item !== undefined) {
        item.quantity = orderIngredients?.filter(x => x === item).length
        return item
      }
      return item
    })},
    [uniqueOrderIngredients, orderIngredients]);
  const totalPrice = useMemo(() =>
    orderIngredients?.reduce((acc: number, item: TIngredient | undefined) => {
      if (item) {
        return acc + item?.price
      }
      return acc
    }, 0),
    [orderIngredients]);

    useEffect(() => {
      const accessToken: any = localStorage.getItem('accessToken');
      const authToken = accessToken && accessToken.split('Bearer ')[1];
      dispatch(WSConnectionMyStart(`?token=${authToken}`));
      if (!pathname.includes('/profile/orders')) {
        return () => {
          dispatch(WSConnectionMyClosed());
        };
      }
    }, []); 

  return (
    <div className={styles.container}>
      {wsMyConnected && !allMyOrders?.orders?.length &&
        <h1 className="text text_type_main-large mt-7">Идёт загрузка...</h1>
      }
      {wsMyError && !allMyOrders?.orders?.length &&
        <h1 className={`text text_type_main-large mt-7 ${styles.error}`}>Произошла ошибка! Попробуйте перезагрузить.</h1>
      }
      {!!allMyOrders?.orders?.length &&
      <>
        <p className={`${styles.number} text text_type_digits-default mt-7 mb-10`}>{`#0${currentOrder?.number}`}</p>
        <h2 className={`${styles.title} text text_type_main-medium ml-10 mb-3`}>{currentOrder?.name}</h2>
        <p className={`${styles.status} text text_type_main-default ml-10 mb-15`}>{currentOrder?.status === 'done' ? 'Выполнен' : currentOrder?.status === 'pending' ? 'В работе' : 'Отменён'}</p>
        <p className={`${styles.title} text text_type_main-medium ml-10 mb-6`}>Состав:</p>
        <ul className={styles.list}>
          {uniqueOrderIngredientsQuantity[0] && uniqueOrderIngredientsQuantity[0]._id &&
          uniqueOrderIngredientsQuantity.map((item: any, i: number) => (
            <li key={item._id} className={styles.list_item}>
              <div className={styles.frame}>
                <img className={styles.image} src={item?.image_mobile} alt={item?.name}/>
              </div>
              <p className={`${styles.image_title} text text_type_main-default ml-4`}>{item?.name}</p>
              <div className={styles.price}>
                <p className={`${styles.number} text text_type_digits-default`}>{`${item?.quantity} x ${item?.price}`}</p>
                <CellEmpty height="ml-2"/>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.date_container}>
          <p className={`${styles.date} text text_type_main-default text_color_inactive`}>{createdAt}</p>
          <div className={styles.price}>
            <p className={`${styles.number} text text_type_digits-default`}>{totalPrice}</p>
            <CellEmpty height="ml-2"/>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </>}
    </div>
  );
};

export default MyOrderDetailsDetailed;
