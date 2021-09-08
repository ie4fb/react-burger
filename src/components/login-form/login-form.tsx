import Form from '../form/form';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useCallback, useState } from 'react';
import loginFormStyles from './login-form.module.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import fixUiKitInput from '../../utils/uiKitInputFix';
import { login } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../services/reducers';

export default function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const validation = useFormWithValidation();
  const { handleChange, errors, isValid, inputsValidity, values } = validation;
  const dispatch = useDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    handleChange(e, [passwordRef, emailRef]);
  };
  const {isLoggedIn} = useSelector((state: RootState) => state.user);
  const history = useHistory()

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn])


  useEffect(() => {
    fixUiKitInput(emailRef, 'mt-6');
    fixUiKitInput(passwordRef, 'mt-6');
  }, [emailRef, passwordRef]);

  const onIconClick = useCallback(() => {
    setIsPasswordHidden(prevState => !prevState);
  }, [setIsPasswordHidden]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (isValid) {
        dispatch(
          login({
            email: formValues.email,
            password: formValues.password,
          }),
        );
      }
    },
    [formValues, dispatch, isValid],
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
          icon= {undefined}
          size={'default'}
          value={values.email}
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
          value={values.password}
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
