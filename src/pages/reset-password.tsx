import React, {useState, ChangeEvent, SyntheticEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import CellEmpty from '../components/cell-empty/cell-empty';
import { setNewPassword } from '../services/actions/password-change';
import styles from './reset-password.module.css';

type TUser = {
  user: {
    name: string;
  };
};
type TUserStore = {
  user: TUser;
};
type TLocationState = {
  from: ILocation
};
interface ILocation {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  state: {from: TLocationState;};
  from: ILocation;
}
type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';
type TIconProps = {
    type: TIconTypes;
    onClick?: () => void;
};
type TICons = {
  ShowIcon: React.FC<TIconProps>;
  HideIcon: React.FC<TIconProps>;
};
function ResetPage() {
  const [form, setValue] = useState({ password: '', token: '' });
  const [passwordIcon, setPasswordIcon] = useState<keyof TICons>('ShowIcon');
  const [passwordInputType, setPasswordInputType] = useState<'text' | 'email' | 'password'>('password');
  const location = useLocation<ILocation>();
  const dispatch = useDispatch();
  const {user} = useSelector<TUserStore, TUser>(store => store.user);
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

  if (user.name) {
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
