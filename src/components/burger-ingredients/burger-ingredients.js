import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import IngredientsElement from '../ingredients-element/ingredients-element';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../contexts/ingredientsContext.js';

function BurgerIngredients(props) {
  const data = useContext(IngredientsContext);
  const [current, setCurrent] = React.useState('Булки');
  const [bun, sauce, main] = useMemo(() =>
    data.reduce((arr, item) => {
      if (item.type === 'bun') {
        arr[0].push(item);
        return arr
      }
      if (item.type === 'sauce') {
        arr[1].push(item);
        return arr
      }
      if (item.type === 'main') {
        arr[2].push(item);
        return arr
      }
      return arr
    }, [[], [], []]),
    [data]
  );

  function openModal(data) {
    props.openModal(data);
  }

  return (
    <div className={styles.construct}>
      <CellEmpty height="mt-10"/>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <CellEmpty height="mt-5"/>
      <div className={styles.links}>
        <a href="#bun" className={styles.link}>
          <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauce" className={styles.link}>
          <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#main" className={styles.link}>
          <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
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
            <li className={styles['ingredients-item']} key={item._id} onClick={() => openModal(item)}>
              <IngredientsElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
        <CellEmpty height="mt-10"/>
        <h2 id='sauce' className="text text_type_main-medium">Соусы</h2>
        <CellEmpty height="mt-6"/>
        <ul className={styles['ingredients-type']}>
          {sauce.map((item) => (
            <li className={styles['ingredients-item']} key={item._id} onClick={() => openModal(item)}>
              <IngredientsElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
        <CellEmpty height="mt-10"/>
        <h2 id='main' className="text text_type_main-medium">Начинки</h2>
        <CellEmpty height="mt-6"/>
        <ul className={styles['ingredients-type']}>
          {main.map((item) => (
            <li className={styles['ingredients-item']} key={item._id} onClick={() => openModal(item)}>
              <IngredientsElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;
