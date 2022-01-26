import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import IngredientsElement from '../ingredients-element/ingredients-element';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 'Булки' };
  }

  setCurrent = (e) => {
    this.setState({ current: e });
  };

  render() {
    const bun = this.props.data.filter((item) => item.type === 'bun');
    const sauce = this.props.data.filter((item) => item.type === 'sauce');
    const main = this.props.data.filter((item) => item.type === 'main');

    return (
      <div className={styles.construct}>
        <CellEmpty height="mt-10"/>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <CellEmpty height="mt-5"/>
        <div style={{ display: 'flex' }}>
          <a href="#bun" style={{fontSize: 0, textDecoration: 'none'}}>
            <Tab value="Булки" active={this.state.current === 'Булки'} onClick={this.setCurrent}>
              Булки
            </Tab>
          </a>
          <a href="#sauce" style={{fontSize: 0, textDecoration: 'none'}}>
            <Tab value="Соусы" active={this.state.current === 'Соусы'} onClick={this.setCurrent}>
              Соусы
            </Tab>
          </a>
          <a href="#main" style={{fontSize: 0, textDecoration: 'none'}}>
            <Tab value="Начинки" active={this.state.current === 'Начинки'} onClick={this.setCurrent}>
              Начинки
            </Tab>
          </a>
        </div>
        <CellEmpty height="mt-10"/>
        <div className={styles.ingredients}>
          <h2 id='bun' className="text text_type_main-medium">Булки</h2>
          <CellEmpty height="mt-6"/>
          <ul className={styles['ingredients-type']}>
            {bun.map((item) => (
              <li className={styles['ingredients-item']}>
                <IngredientsElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  key={item._id}
                />
              </li>
            ))}
          </ul>
          <CellEmpty height="mt-10"/>
          <h2 id='sauce' className="text text_type_main-medium">Соусы</h2>
          <CellEmpty height="mt-6"/>
          <ul className={styles['ingredients-type']}>
            {sauce.map((item) => (
              <li className={styles['ingredients-item']}>
                <IngredientsElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  key={item._id}
                />
              </li>
            ))}
          </ul>
          <CellEmpty height="mt-10"/>
          <h2 id='main' className="text text_type_main-medium">Начинки</h2>
          <CellEmpty height="mt-6"/>
          <ul className={styles['ingredients-type']}>
            {main.map((item) => (
              <li className={styles['ingredients-item']}>
                <IngredientsElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  key={item._id}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  }).isRequired).isRequired
};

export default BurgerIngredients;
