import React, { useMemo, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import IngredientsElement from '../ingredients-element/ingredients-element';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

function BurgerIngredients() {
  const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(store => store.ingredients);
  const [current, setCurrent] = React.useState('Булки');
  const [bun, sauce, main] = useMemo(() =>
    ingredients.reduce((arr, item) => {
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
    [ingredients]
  );
  const ingredientsRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  function handleScroll() {
    const bunsRoofDistance = bunRef.current.getBoundingClientRect().top - 15;
    const saucesRoofDistance = sauceRef.current.getBoundingClientRect().top - 15;
    const mainsRoofDistance = mainRef.current.getBoundingClientRect().top - 15;
    const ingredientsRoofDistance = ingredientsRef.current.getBoundingClientRect().top;
    const bunsceilingDistance = Math.abs(ingredientsRoofDistance - bunsRoofDistance);
    const saucesceilingDistance = Math.abs(ingredientsRoofDistance - saucesRoofDistance);
    const mainsceilingDistance = Math.abs(ingredientsRoofDistance - mainsRoofDistance);
    const nearestTitle = Math.min(bunsceilingDistance, saucesceilingDistance, mainsceilingDistance);
    if (nearestTitle === bunsceilingDistance) {
      setCurrent('Булки');
    } else if (nearestTitle === saucesceilingDistance) {
      setCurrent('Соусы');
    } else {
      setCurrent('Начинки');
    }
  }

  return (
    <div className={styles.construct}>
      {ingredientsRequest &&
        <h1 className="text text_type_main-large">Идёт загрузка...</h1>
      }
      {ingredientsFailed && !ingredients.length &&
        <h1 className={`text text_type_main-large ${styles.error}`}>Произошла ошибка! Попробуйте перезагрузить.</h1>
      }
      {!!ingredients.length &&
      <>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
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
        <div className={styles.ingredients} onScroll={handleScroll} ref={ingredientsRef}>
          <h2 id='bun' className="text text_type_main-medium mb-6" ref={bunRef}>Булки</h2>
          <ul className={styles['ingredients-type']}>
            {bun.map((item) => (
              <li className={styles['ingredients-item']} key={item._id}>
                <IngredientsElement
                  data={item}
                />
              </li>
            ))}
          </ul>
          <h2 id='sauce' className="text text_type_main-medium mt-10 mb-6" ref={sauceRef}>Соусы</h2>
          <ul className={styles['ingredients-type']}>
            {sauce.map((item) => (
              <li className={styles['ingredients-item']} key={item._id}>
                <IngredientsElement
                  data={item}
                />
              </li>
            ))}
          </ul>
          <h2 id='main' className="text text_type_main-medium mt-10 mb-6" ref={mainRef}>Начинки</h2>
          <ul className={styles['ingredients-type']}>
            {main.map((item) => (
              <li className={styles['ingredients-item']} key={item._id}>
                <IngredientsElement
                  data={item}
                />
              </li>
            ))}
          </ul>
        </div>
      </>}
    </div>
  );
}

export default BurgerIngredients;
