import React, {useState} from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CellEmpty from '../components/cell-empty/cell-empty';
import styles from './login.module.css';

function LoginPage(props) {
  const [form, setValue] = useState({ email: '', password: '' });
  const location = useLocation();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const {email, password} = form;
    props.handleSubmit(email, password);
  }
  console.log(props.loggedIn);
  if (props.loggedIn) {
    console.log(location.state?.from);
    return <Redirect to={location.state?.from || '/'}/>
  }

  return (
    <div className={styles.login}>
      <CellEmpty height="pt-20"/>
      <CellEmpty height="pt-25"/>
      <h1 className="text text_type_main-medium">Вход</h1>
      <CellEmpty height="pt-6"/>
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
      <CellEmpty height="pt-20"/>
      <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?
        <Link to="/register" className={`text text_type_main-default ${styles.link}`}>Зарегистрироваться</Link>
      </p>
      <CellEmpty height="pt-4"/>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль?
        <Link to="/forgot-password" className={`text text_type_main-default ${styles.link}`}>Восстановить пароль</Link>
      </p>
    </div>
  );
}

export default LoginPage;
