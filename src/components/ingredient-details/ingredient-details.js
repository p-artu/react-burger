import React from 'react';
import styles from './ingredient-details.module.css';
import { ingredientsPropTypes } from '../../utils/types';

function IngredientDetails(props) {
  return (
    <div className={styles.ingredientDetails}>
      <img className={styles.image} src={props.data.image_large} alt={props.data.name}/>
      <p className="text text_type_main-medium mb-8">{props.data.name}</p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{props.data.calories}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.data.proteins}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.data.fat}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  data: ingredientsPropTypes.isRequired
};


export default IngredientDetails;
