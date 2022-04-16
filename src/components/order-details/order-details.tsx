import React from 'react';
import { useSelector } from '../../services/hooks';
import styles from './order-details.module.css';
import done from '../../images/done.png';

function OrderDetails() {
  const { orderDetails } = useSelector(store => store.order);

  return (
    <>
      <h2 className={`text text_type_digits-large mt-30 mb-8 ${styles.id}`}>{orderDetails}</h2>
      <div className={styles.orderDetails}>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img className={styles.image} src={done} alt="Галочка" />
        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
};

export default OrderDetails;
