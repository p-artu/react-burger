import React, {useEffect} from 'react';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import app from './app.module.css';
import { HomePage, LoginPage, RegisterPage, ForgotPage, ResetPage, ProfilePage, PageNotFound } from '../../pages';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CLOSE_INGREDIENT_MODAL } from '../../services/actions/ingredient-modal';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const background = history.action === 'PUSH' && location.state && location.state.from;

  useEffect(() => {
    console.log('cassa');
    dispatch(getIngredients());
  }, []);

  function closeIngredientPopup() {
    history.goBack();
    //dispatch({ type: CLOSE_INGREDIENT_MODAL });
    console.log(background);
  }
  console.log(background);
  return (
    <div className={app.page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPage />
        </Route>
        <Route path="/profile" exact={true}>
          <ProfilePage />
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails/>
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      {background &&
        <Route path="/ingredients/:id" exact={true}>
          <Modal closePopup={closeIngredientPopup}>
            <IngredientDetails/>
          </Modal>
        </Route>}
    </div>
  );
}

export default App;
