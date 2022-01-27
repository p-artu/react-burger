import React from 'react';
import app from './app.module.css';
import {data} from '../../utils/data';
import CellEmpty from '../cell-empty/cell-empty';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

class App extends React.Component {
  render() {
    return (
      <div className={app.page}>
        <AppHeader />
        <main className={app.main}>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
        </main>
        <CellEmpty height="mb-3"/>
      </div>
    );
  }
}

export default App;
