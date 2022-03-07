import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import CellEmpty from '../components/cell-empty/cell-empty';
import { setNewPasswordRequest } from '../services/actions/user';
import styles from './reset-password.module.css';

function ResetPage() {
  const [form, setValue] = useState({ password: '', token: '' });
  const [passwordIcon, setPasswordIcon] = useState('ShowIcon');
  const [passwordInputType, setPasswordInputType] = useState('password');
  const location = useLocation();
  const dispatch = useDispatch();
  const {user} = useSelector(store => store.user);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  function onIconClick() {
    if (passwordIcon === 'ShowIcon') {
      setPasswordIcon('HideIcon');
      setPasswordInputType('text');
    } else {
      setPasswordIcon('ShowIcon');
      setPasswordInputType('password');
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setNewPasswordRequest(form.token, form.password));
  }

  if (user.name) {
    return <Redirect to={location.state?.from || '/'}/>
  }

  return (
    <div className={styles.reset}>
      <CellEmpty height="pt-20"/>
      <CellEmpty height="pt-25"/>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <CellEmpty height="pt-6"/>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          type={passwordInputType}
          placeholder={'Введите новый пароль'}
          icon={passwordIcon}
          onIconClick={onIconClick}
          onChange={onChange}
          value={form.password}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <CellEmpty height="pt-6"/>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={form.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <CellEmpty height="pt-6"/>
        <Button type="primary" size="medium">Сохранить</Button>
      </form>
      <CellEmpty height="pt-20"/>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
        <Link to="/register" className={`text text_type_main-default ${styles.link}`}>Войти</Link>
      </p>
    </div>
  );
}

export default ResetPage;
