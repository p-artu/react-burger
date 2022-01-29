import React from 'react';
import styles from './ingredient-details.module.css';
import { INGREDIENTS_PROPTYPES } from '../../utils/types';

class IngredientDetails extends React.Component {
  render() {
    return (
      <div className={styles.ingredientDetails}>
        <img className={styles.image} src={this.props.data.image_large} alt={this.props.data.name}/>
        <p className="text text_type_main-medium mb-8">{this.props.data.name}</p>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{this.props.data.calories}</p>
          </li>
          <li className={styles.item}>
            <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{this.props.data.proteins}</p>
          </li>
          <li className={styles.item}>
            <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{this.props.data.fat}</p>
          </li>
          <li className={styles.item}>
            <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{this.props.data.carbohydrates}</p>
          </li>
        </ul>
      </div>
    );
  }
};

IngredientDetails.propTypes = {
  data: INGREDIENTS_PROPTYPES.isRequired
};


export default IngredientDetails;
