import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-element.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsElement(props: any) {
  return (
    <div className={styles.ingredient}>
      <Counter count={1} size="default" />
      <img className={styles.image} src={props.thumbnail} alt={props.text}/>
      <div className={styles.price}>
        <p className={`${styles.number} text text_type_digits-default`}>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.text} text text_type_main-default mb-6`}>{props.text}</p>
    </div>
  );
}

IngredientsElement.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired
};

export default IngredientsElement;
