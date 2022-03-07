import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './profile-menu.module.css';
import CellEmpty from '../cell-empty/cell-empty';
import { logout } from '../../services/actions/user';

function ProfileMenu() {
  const dispatch = useDispatch();

  function signOut() {
    dispatch(logout());
  }

  return (
    <div className={styles.profileMenu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <NavLink activeClassName={styles.activeNavlink} to="/profile" exact={true} className={`${styles.navlink} text text_type_main-medium`}>
            Профиль
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink activeClassName={styles.activeNavlink} to="/profile/orders" exact={true} className={`${styles.navlink} text text_type_main-medium`}>
            История заказов
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          <button onClick={signOut} className={`${styles.exit} text text_type_main-medium`}>Выход</button>
        </li>
      </ul>
      <CellEmpty height="pt-20"/>
      <p className='text text_type_main-default text_color_inactive'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}

export default ProfileMenu;
