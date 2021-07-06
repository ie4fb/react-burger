import Form from '../form/form';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useCallback, useState } from 'react';
import loginFormStyles from './login-form.module.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import {
  Input,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import fixUiKitInput from '../../utils/uiKitInputFix';
export default function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const validation = useFormWithValidation();
  const { handleChange, errors, isValid, inputsValidity } = validation;

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    handleChange(e, [passwordRef, emailRef]);
  };

  useEffect(() => {
    fixUiKitInput(emailRef);
    fixUiKitInput(passwordRef);
  }, [emailRef, passwordRef]);

  const onIconClick = useCallback(() => {
    setIsPasswordHidden(prevState => !prevState);
  }, [setIsPasswordHidden]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log(formValues, isValid);
    },
    [formValues, isValid],
  );
  return (
    <>
      <h1 className={`text text_type_main-medium ${loginFormStyles.heading}`}>
        Вход
      </h1>
      <Form onSubmit={onSubmit}>
        <Input
          error={inputsValidity.email ? false : true}
          errorText={inputsValidity.email ? undefined : errors.email}
          onChange={onChange}
          ref={emailRef}
          type="email"
          placeholder="E-mail"
          name="email"
          icon="undefinded"
          size={'default'}
        />
        <Input
          error={inputsValidity.password ? false : true}
          errorText={inputsValidity.password ? undefined : errors.password}
          onChange={onChange}
          ref={passwordRef}
          type={isPasswordHidden ? 'password' : 'text'}
          placeholder="Пароль"
          name="password"
          icon={isPasswordHidden ? 'ShowIcon' : 'HideIcon'}
          size={'default'}
          onIconClick={onIconClick}
        />
        <div className={`${loginFormStyles.button_container} mt-6 mb-20`}>
          <Button type={isValid ? 'primary' : 'secondary'} size="large">
            Войти
          </Button>
        </div>
      </Form>
      <p className={`text text_type_main-default text_color_inactive`}>
        Вы - новый пользователь?{' '}
        <Link className={loginFormStyles.link} to={'/register'}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={`text text_type_main-default text_color_inactive mt-4`}>
        Забыли пароль?{' '}
        <Link className={loginFormStyles.link} to={'/forgot-password'}>
          Восстановить пароль
        </Link>
      </p>
    </>
  );
}
