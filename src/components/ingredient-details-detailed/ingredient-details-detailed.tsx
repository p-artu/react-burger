import React, {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import styles from './ingredient-details-detailed.module.css';
import { useSelector } from '../../services/hooks';

function OrderDetailsDetailed() {
  const { allOrders } = useSelector(store => store.order);
  const {id}: {id: string} = useParams();
  const currentOrder = allOrders.orders.find(item => item._id === id);
  const orderIngredients = useMemo(() =>
    currentOrder?.ingredients.map((id: string) => {
      return ingredients.find((item) => {
        return item._id === id
      })
    }),
    [currentOrder]
  );
  const uniqueOrderIngredients = [...new Set(orderIngredients)];
  const totalPrice = useMemo(() =>
    orderIngredients.reduce((acc: number, item: any) => {
      return acc + item.price
    }, 0),
    [orderIngredients]);

  return (
    <>
      <p className={`${styles.number} text text_type_digits-default`}>{`#0${currentOrder?.number}`}</p>
      <h2 className={`text text_type_main-large mt-10 ml-10 ${styles.title}`}>{currentOrder?.name}</h2>
      <p className={`${styles.status} text text_type_digits-default`}>{currentOrder?.status}</p>
      <p className={`${styles.title} text text_type_digits-default`}>Состав:</p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <img className={styles.image} src={item.image_mobile} alt={item.name}/>
          <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
        </li>
      </ul>
      <p className={`${styles.date} text text_type_main-default text_color_inactive`}>{currentOrder?.createdAt}</p>
    </>
  );
};

export default OrderDetailsDetailed;
