import React from 'react';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import styles from './ingredients-element.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from '../../utils/types';

function IngredientsElement(props) {
  const {data} = props;
  const counterList = useSelector(store => store.reducer.counterList);
  const [{isDrag} , dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
    <div ref={dragRef} className={isDrag ? `${styles.ingredient} ${styles.opacity}` : styles.ingredient}>
      {!!counterList[data._id] && <Counter count={counterList[data._id]} size="default" />}
      <img className={styles.image} src={data.image} alt={data.name}/>
      <div className={styles.price}>
        <p className={`${styles.number} text text_type_digits-default`}>{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.text} text text_type_main-default mb-6`}>{data.name}</p>
    </div>
  );
}

IngredientsElement.propTypes = {
  data: ingredientsPropTypes.isRequired
};

export default IngredientsElement;
