import React from 'react';
import styles from './ingredients-element.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsElement(props: any) {
  return (
    <div className={styles.ingredient}>
      <Counter count={1} size="default" />
      <img className={styles.image} src={props.thumbnail} alt={props.text}/>
      <div className={styles.price}>
        <p className="text text_type_digits-default" style={{marginRight: 9}}>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-6" style={{textAlign: 'center'}}>{props.text}</p>
    </div>
  );
}

export default IngredientsElement;
