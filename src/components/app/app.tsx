import React, {useEffect} from 'react';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import app from './app.module.css';
import { HomePage, LoginPage, RegisterPage, ForgotPage, ResetPage, ProfilePage, OrderFeedPage, PageNotFound } from '../../pages';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getIngredients, getUserInfo } from '../../services/actions';
import { ILocation } from '../../utils/types';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation<ILocation>();
  const history = useHistory();
  const previousPath = history.action === 'PUSH' && location.state && location.state?.from;

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  function closeIngredientPopup() {
    history.goBack();
  }

  return (
    <div className={app.page}>
      <AppHeader />
      <Switch location={previousPath || location}>
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
        <ProtectedRoute
          exact={true}
          path="/profile"
        >
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails/>
        </Route>
        <Route path="/feed" exact={true}>
          <OrderFeedPage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      {previousPath &&
        <Route path="/ingredients/:id" exact={true}>
          <Modal closePopup={closeIngredientPopup}>
            <IngredientDetails/>
          </Modal>
        </Route>}
    </div>
  );
}

export default App;
