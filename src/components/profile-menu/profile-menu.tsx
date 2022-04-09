import React from 'react';
import { useDispatch } from '../../services/hooks';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './profile-menu.module.css';
import { logout } from '../../services/actions';

function ProfileMenu() {
  const dispatch = useDispatch();
  const {pathname} = useLocation();

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
      <p className='text text_type_main-default text_color_inactive mt-20'>
        {pathname === '/profile/orders' ?
          'В этом разделе вы можете просмотреть свою историю заказов'
        :
          'В этом разделе вы можете изменить свои персональные данные'
        }
      </p>
    </div>
  );
}

export default ProfileMenu;
