import React, {useState, ChangeEvent, SyntheticEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CellEmpty from '../components/cell-empty/cell-empty';
import { authorize } from '../services/actions/user';
import styles from './login.module.css';

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
function LoginPage() {
  const [form, setValue] = useState({ email: '', password: '' });
  const location = useLocation<ILocation>();
  const dispatch = useDispatch();
  const {user} = useSelector<TUserStore, TUser>(store => store.user);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const {email, password} = form;
    dispatch(authorize(email, password));
  }

  if (user.name) {
    return <Redirect to={location.state?.from || '/'}/>
  }

  return (
    <div className={styles.login}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={onChange}
          value={form.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <CellEmpty height="pt-6"/>
        <PasswordInput size="default" onChange={onChange} value={form.password} name={'password'} />
        <CellEmpty height="pt-6"/>
        <Button type="primary" size="medium">Войти</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20 mb-4">Вы — новый пользователь?
        <Link to="/register" className={`text text_type_main-default ${styles.link}`}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль?
        <Link to="/forgot-password" className={`text text_type_main-default ${styles.link}`}>Восстановить пароль</Link>
      </p>
    </div>
  );
}

export default LoginPage;