import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import { ingredientsPropTypes } from '../../utils/types';

class IngredientDetails extends React.Component {
  render() {
    return (
      <div className={styles.ingredientDetails}>
        <h2 className={`text text_type_main-large mt-10 ml-10 ${styles.title}`}>Детали ингредиента</h2>
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
  data: ingredientsPropTypes.isRequired
};


export default IngredientDetails;
