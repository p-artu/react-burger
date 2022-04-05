import React from 'react';
import {useParams} from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { useSelector } from '../../services/hooks';

function IngredientDetails() {
  const {ingredients} = useSelector(store => store.ingredients);
  const {id}: {id: string} = useParams();
  const currentIngredient = ingredients.find(item => item._id === id);

  return (
    <>
      <h2 className={`text text_type_main-large mt-10 ml-10 ${styles.title}`}>Детали ингредиента</h2>
      <div className={styles.ingredientDetails}>
        <img className={styles.image} src={currentIngredient?.image_large} alt={currentIngredient?.name}/>
        <p className="text text_type_main-medium mb-8">{currentIngredient?.name}</p>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.calories}</p>
          </li>
          <li className={styles.item}>
            <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.proteins}</p>
          </li>
          <li className={styles.item}>
            <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.fat}</p>
          </li>
          <li className={styles.item}>
            <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default IngredientDetails;
