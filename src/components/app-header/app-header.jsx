import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import header from './header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={header.header}>
      <div className={header.container}>
        <div className={header.links}>
          <NavLink activeClassName={header.activeMenu} to="/" exact={true} className={`${header.menu} pt-4 pb-4 pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default pl-2">Конструктор</p>
          </NavLink>
          <NavLink activeClassName={header.activeMenu} to="/orders" exact={true} className={`${header.menu} pt-4 pb-4 pl-5 pr-5 ml-2`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default pl-2">Лента заказов</p>
          </NavLink>
        </div>
        <Link to='/' className={header.logo}>
          <Logo />
        </Link>
        <NavLink activeClassName={header.activeMenu} to="/profile" exact={true} className={`${header.menu} pt-4 pb-4 pl-5 pr-5`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default pl-2">Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
