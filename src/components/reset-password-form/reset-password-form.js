import Form from '../form/form';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useCallback, useState } from 'react';
import resetFormStyles from './reset-password-form.module.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import fixUiKitInput from '../../utils/uiKitInputFix';
import { resetPassword } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
export default function ResetPasswordForm() {
  const securityCodeRef = useRef(null);
  const passwordRef = useRef(null);
  const [formValues, setFormValues] = useState({
    securityCode: '',
    password: '',
  });

  const { resetPasswordSuccess } = useSelector(store => store.user)
  const history = useHistory();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const dispatch = useDispatch();

  const validation = useFormWithValidation();
  const { handleChange, errors, isValid, inputsValidity } = validation;

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    handleChange(e, [securityCodeRef, passwordRef]);
  };

  useEffect(() => {
    if(resetPasswordSuccess) {
      history.push('/profile')
    }
  })

  useEffect(() => {
    fixUiKitInput(securityCodeRef, 'mt-6');
    fixUiKitInput(passwordRef, 'mt-6');
  }, [passwordRef, securityCodeRef]);

  const onIconClick = useCallback(() => {
    setIsPasswordHidden(prevState => !prevState);
  }, [setIsPasswordHidden]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (isValid) {
        dispatch(
          resetPassword({
            password: formValues.password,
            token: formValues.securityCode,
          }),
        );
      }
      console.log(formValues, isValid);
    },
    [formValues, isValid, dispatch],
  );
  return (
    <>
      <h1 className={`text text_type_main-medium ${resetFormStyles.heading}`}>
        Восстановление пароля
      </h1>
      <Form onSubmit={onSubmit}>
        <Input
          error={inputsValidity.password ? false : true}
          errorText={inputsValidity.password ? undefined : errors.password}
          onChange={onChange}
          ref={passwordRef}
          type={isPasswordHidden ? 'password' : 'text'}
          placeholder="Введите новый пароль"
          name="password"
          icon={isPasswordHidden ? 'ShowIcon' : 'HideIcon'}
          size={'default'}
          onIconClick={onIconClick}
        />
        <Input
          error={inputsValidity.securityCode ? false : true}
          errorText={
            inputsValidity.securityCode ? undefined : errors.securityCode
          }
          onChange={onChange}
          ref={securityCodeRef}
          type="text"
          placeholder="Введите код из письма"
          name="securityCode"
          icon="undefinded"
          size={'default'}
        />
        <div className={`${resetFormStyles.button_container} mt-6 mb-20`}>
          <Button type={isValid ? 'primary' : 'secondary'} size="large">
            Сохранить
          </Button>
        </div>
      </Form>
      <p className={`text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?{' '}
        <Link className={resetFormStyles.link} to={'/login'}>
          Войти
        </Link>
      </p>
    </>
  );
}
