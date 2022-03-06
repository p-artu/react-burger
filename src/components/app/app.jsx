import React, {useEffect, useState} from 'react';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import app from './app.module.css';
import { HomePage, LoginPage, RegisterPage, ForgotPage, ResetPage, ProfilePage, PageNotFound } from '../../pages';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import ProtectedRoute from '../protected-route/protected-route.js';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getIngredients } from '../../services/actions/ingredients';
import { BurgersApi } from '../../utils/BurgersApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({email: '', name: ''});
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const background = history.action === 'PUSH' && location.state && location.state.from;

  useEffect(() => {
    if (localStorage.getItem('accessToken')){
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken){
        BurgersApi.getUserInfo(accessToken)
        .then(res => {
          if (res){
            setLoggedIn(true);
            console.log(res);
            setCurrentUser({email: res.user.email, name: res.user.name});
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
    }
  }, [loggedIn]);
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  function signOut() {
    const refreshToken = localStorage.getItem('refreshToken');
    BurgersApi.logout(refreshToken)
    .then(res => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setCurrentUser({email: '', name: ''});
      setLoggedIn(false);
      console.log(res);
      history.push('/');
    })
    .catch(err => {
      console.error(`Ошибка: ${err.message}`);
    });
  }
  function closeIngredientPopup() {
    history.goBack();
  }
  function handleRegisterSubmit(email, password, name) {
    BurgersApi.register(email, password, name)
    .then(res => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      setLoggedIn(true);
      history.push('/');
    })
    .catch(err => {
      console.error(`Ошибка: ${err.message}`);
    });
  }
  function handleLoginSubmit(email, password) {
    BurgersApi.authorize(email, password)
    .then(res => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      setLoggedIn(true);
    })
    .catch(err => {
      console.error(`Ошибка: ${err.message}`);
    });
  }
  function recoverPassword(email) {
    BurgersApi.resetPassword(email)
    .then(res => {
      console.log(res);
      history.push('/reset-password');
    })
    .catch(err => {
      console.error(`Ошибка: ${err.message}`);
    });
  }
  function setNewPassword(token, password) {
    BurgersApi.setNewPassword(token, password)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(`Ошибка: ${err.message}`);
    });
  }
  function handleUpdateUser(email, password, name) {
    const accessToken = localStorage.getItem('accessToken');
    BurgersApi.editUserInfo(accessToken, email, password, name)
    .then(res => {
      setCurrentUser({email: res.user.email, name: res.user.name});
      console.log(res);
    })
    .catch(err => {
      console.error(`Ошибка: ${err.message}`);
    });
  }

  return (
    <div className={app.page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage handleSubmit={handleLoginSubmit} loggedIn={loggedIn} />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage handleSubmit={handleRegisterSubmit} loggedIn={loggedIn} />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPage recoverPassword={recoverPassword} />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPage setNewPassword={setNewPassword} />
        </Route>
        <ProtectedRoute
          exact={true}
          path="/profile"
          loggedIn={loggedIn}
        >
          <ProfilePage
            signOut={signOut}
            currentUser={currentUser}
            handleSubmit={handleUpdateUser}
          />
        </ProtectedRoute>
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
