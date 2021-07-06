import Form from '../form/form';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useCallback, useState } from 'react';
import registerFormStyles from './register-form.module.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import fixUiKitInput from '../../utils/uiKitInputFix';
export default function RegisterForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [formValues, setFormValues] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const validation = useFormWithValidation();
  const { handleChange, errors, isValid, inputsValidity } = validation;

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    handleChange(e, [nameRef, passwordRef, emailRef]);
  };

  useEffect(() => {
    fixUiKitInput(nameRef);
    fixUiKitInput(emailRef);
    fixUiKitInput(passwordRef);
  }, [emailRef, passwordRef, nameRef]);

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
      <h1
        className={`text text_type_main-medium ${registerFormStyles.heading}`}
      >
        Вход
      </h1>
      <Form onSubmit={onSubmit}>
        <Input
          error={inputsValidity.userName ? false : true}
          errorText={inputsValidity.userName ? undefined : errors.userName}
          onChange={onChange}
          ref={nameRef}
          type="text"
          placeholder="Имя"
          name="userName"
          icon="undefinded"
          size={'default'}
        />
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
        <div className={`${registerFormStyles.button_container} mt-6 mb-20`}>
          <Button type={isValid ? 'primary' : 'secondary'} size="large">
            Войти
          </Button>
        </div>
      </Form>
      <p className={`text text_type_main-default text_color_inactive`}>
        Уже зарегистрированы?{' '}
        <Link className={registerFormStyles.link} to={'/login'}>
          Войти
        </Link>
      </p>
    </>
  );
}
