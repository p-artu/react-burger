import React, {useState, ChangeEvent, SyntheticEvent} from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CellEmpty from '../components/cell-empty/cell-empty';
import { register } from '../services/actions';
import styles from './register.module.css';
import { ILocation } from '../utils/types';

function RegisterPage() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const location = useLocation<ILocation>();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user.user);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const {email, password, name} = form;
    dispatch(register(email, password, name));
  }

  if (user.name !== '') {
    return <Redirect to={location.state?.from || '/'}/>
  }

  return (
    <div className={styles.register}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <CellEmpty height="pt-6"/>
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
        <Button type="primary" size="medium">Зарегистрироваться</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20 mb-20">Уже зарегистрированы?
        <Link to="/login" className={`text text_type_main-default ${styles.link}`}>Войти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
