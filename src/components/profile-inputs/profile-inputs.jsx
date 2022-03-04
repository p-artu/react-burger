import React, {useState, useRef} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-inputs.module.css';
import CellEmpty from '../cell-empty/cell-empty';

function ProfileInputs() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const [inputDisabled, setInputDisabled] = useState({ name: true, email: true, password: true });
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }
  function onNameIconClick() {
    setTimeout(() => nameRef.current.focus(), 0);
    setInputDisabled({ ...inputDisabled, name: !inputDisabled.name });
  }
  function onEmailIconClick() {
    setTimeout(() => emailRef.current.focus(), 0);
    setInputDisabled({ ...inputDisabled, email: !inputDisabled.email });
  }
  function onPasswordIconClick() {
    setTimeout(() => passwordRef.current.focus(), 0);
    setInputDisabled({ ...inputDisabled, password: !inputDisabled.password });
  }
  function onNameBlur() {
    setInputDisabled({ ...inputDisabled, name: true });
  }
  function onEmailBlur() {
    setInputDisabled({ ...inputDisabled, email: true });
  }
  function onPasswordBlur() {
    setInputDisabled({ ...inputDisabled, password: true });
  }
  function handleSubmit(e) {}
  function undoChanges() {
    setValue({ name: '', email: '', password: '' });
  }

  return (
    <div className={styles.profileInputs}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          type={'text'}
          placeholder={'Имя'}
          icon={'EditIcon'}
          onIconClick={onNameIconClick}
          onBlur={onNameBlur}
          onChange={onChange}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          disabled={inputDisabled.name}
          ref={nameRef}
        />
        <CellEmpty height="pt-6"/>
        <Input
          type={'email'}
          placeholder={'Логин'}
          icon={'EditIcon'}
          onIconClick={onEmailIconClick}
          onBlur={onEmailBlur}
          onChange={onChange}
          value={form.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          disabled={inputDisabled.email}
          ref={emailRef}
        />
        <CellEmpty height="pt-6"/>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          onIconClick={onPasswordIconClick}
          onBlur={onPasswordBlur}
          onChange={onChange}
          value={form.password}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          disabled={inputDisabled.password}
          ref={passwordRef}
        />
        <CellEmpty height="pt-6"/>
        <div className={styles.buttons}>
          <div className={styles.buttonContainer}>
            <Button onClick={undoChanges} type='secondary' size='medium'>
              Отмена
            </Button>
          </div>
          <Button type='primary' size='medium'>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileInputs;
