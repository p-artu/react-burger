import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import app from './app.module.css';
import { HomePage, LoginPage, PageNotFound } from '../../pages';
import AppHeader from '../app-header/app-header';

function App() {
  return (
    <BrowserRouter>
      <div className={app.page}>
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <AppHeader />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <AppHeader />
          </Route>
          <Route path="/reset-password" exact={true}>
            <AppHeader />
          </Route>
          <Route path="/profile" exact={true}>
            <AppHeader />
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <AppHeader />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
