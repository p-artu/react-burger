import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import CellEmpty from '../components/cell-empty/cell-empty';
import { recoverPassword } from '../services/actions/password-change';
import styles from './forgot-password.module.css';

function ForgotPage() {
  const [form, setValue] = useState({email: '' });
  const location = useLocation();
  const dispatch = useDispatch();
  const {user} = useSelector(store => store.user);
  const history = useHistory();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(recoverPassword(form.email));
    history.push({pathname: `/reset-password`, state: location});
  }

  if (user.name) {
    return <Redirect to={location.state?.from || '/'}/>
  }

  return (
    <div className={styles.forgot}>
      <CellEmpty height="pt-20"/>
      <CellEmpty height="pt-25"/>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <CellEmpty height="pt-6"/>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={onChange}
          value={form.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <CellEmpty height="pt-6"/>
        <Button type="primary" size="medium">Восстановить</Button>
      </form>
      <CellEmpty height="pt-20"/>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
        <Link to="/login" className={`text text_type_main-default ${styles.link}`}>Войти</Link>
      </p>
      <CellEmpty height="pt-20"/>
    </div>
  );
}

export default ForgotPage;
