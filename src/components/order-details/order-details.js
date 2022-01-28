import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import done from '../../images/done.png';

class OrderDetails extends React.Component {
  render() {
    return (
      <div className={styles.orderDetails}>
        <h2 className={`text text_type_digits-large mt-30 mb-8 ${styles.id}`}>{this.props.data}</h2>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img className={styles.image} src={done} alt="Галочка" />
        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    );
  }
};

OrderDetails.propTypes = {
  data: PropTypes.string.isRequired
};

export default OrderDetails;
