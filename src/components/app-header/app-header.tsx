import React from 'react';
import header from './header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
  render() {
    return (
      <header className={header.header}>
        <div className={header.container}>
          <div className={header.links}>
            <div className={`${header.menu} pt-4 pb-4 pl-5 pr-5`}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </div>
            <div className={`${header.menu} pt-4 pb-4 pl-5 pr-5 ml-2`}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
            </div>
          </div>
          <div className={header.logo}>
            <Logo />
          </div>
          <div className={`${header.menu} pt-4 pb-4 pl-5 pr-5`}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
          </div>
        </div>
      </header>
    );
  }
}

export default AppHeader;
