import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CellEmpty from '../components/cell-empty/cell-empty';
import styles from './register.module.css';

function RegisterPage() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {}

  return (
    <div className={styles.register}>
      <CellEmpty height="pt-20"/>
      <CellEmpty height="pt-25"/>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <CellEmpty height="pt-6"/>
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
      <CellEmpty height="pt-20"/>
      <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
        <Link to="/login" className={`text text_type_main-default ${styles.link}`}>Войти</Link>
      </p>
      <CellEmpty height="pt-20"/>
    </div>
  );
}

export default RegisterPage;
