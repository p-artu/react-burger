import React, {useState, ChangeEvent, SyntheticEvent} from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import CellEmpty from '../components/cell-empty/cell-empty';
import { setNewPassword } from '../services/actions';
import styles from './reset-password.module.css';
import { ILocation, TICons } from '../utils/types';

function ResetPage() {
  const [form, setValue] = useState({ password: '', token: '' });
  const [passwordIcon, setPasswordIcon] = useState<keyof TICons>('ShowIcon');
  const [passwordInputType, setPasswordInputType] = useState<'text' | 'email' | 'password'>('password');
  const location = useLocation<ILocation>();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user.user);
  const history = useHistory();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    dispatch(setNewPassword(form.token, form.password));
    history.push('/login');
  }

  if (user.name !== '') {
    return <Redirect to={location.state?.from || '/'}/>
  }
  if (!location.state?.pathname) {
    return <Redirect to={'/forgot-password'}/>
  }

  return (
    <div className={styles.reset}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
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
      <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль?
        <Link to="/register" className={`text text_type_main-default ${styles.link}`}>Войти</Link>
      </p>
    </div>
  );
}

export default ResetPage;
