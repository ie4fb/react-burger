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
import { register } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

type TUserStatus = {
  user: {
    isLoggedIn: boolean;
    registerSuccess: boolean;
  };
};

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
  const dispatch = useDispatch();
  const history = useHistory();

  const validation = useFormWithValidation();
  const { handleChange, errors, isValid, inputsValidity, values } = validation;
  const { isLoggedIn, registerSuccess } = useSelector(
    (state: TUserStatus) => state.user,
  );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    handleChange(e, [nameRef, passwordRef, emailRef]);
  };

  useEffect(() => {
    fixUiKitInput({input: nameRef, styleAdditional: 'mt-6'});
    fixUiKitInput({input: emailRef, styleAdditional: 'mt-6'});
    fixUiKitInput({input: passwordRef, styleAdditional: 'mt-6'});
  }, [emailRef, passwordRef, nameRef]);

  const onIconClick = useCallback(() => {
    setIsPasswordHidden(prevState => !prevState);
  }, [setIsPasswordHidden]);

  useEffect(() => {
    if (registerSuccess) {
      history.push('/login');
    }
  }, [history, isLoggedIn, registerSuccess]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (isValid) {
        dispatch(
          register({
            name: formValues.userName,
            email: formValues.email,
            password: formValues.password,
          }),
        );
      }
    },
    [formValues, isValid, dispatch],
  );

  return (
    <>
      <h1
        className={`text text_type_main-medium ${registerFormStyles.heading}`}
      >
        Регистрация
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
          size={'default'}
          value={values.userName || ''}
        />
        <Input
          error={inputsValidity.email ? false : true}
          errorText={inputsValidity.email ? undefined : errors.email}
          onChange={onChange}
          ref={emailRef}
          type="email"
          placeholder="E-mail"
          name="email"
          size={'default'}
          value={values.email || ''}
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
          value={values.password || ''}
        />
        <div className={`${registerFormStyles.button_container} mt-6 mb-20`}>
          <Button type={isValid ? 'primary' : 'secondary'} size="large">
            Зарегистрироваться
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
