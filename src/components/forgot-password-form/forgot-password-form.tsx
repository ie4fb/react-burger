import Form from '../form/form';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useCallback, useState } from 'react';
import forgotFormStyles from './forgot-password-form.module.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import fixUiKitInput from '../../utils/uiKitInputFix';
import { forgotPassword } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../services/reducers/';
const {
  Input,
  Button,
} = require('@ya.praktikum/react-developer-burger-ui-components');

export default function ForgotPasswordForm() {
  const emailRef = useRef<HTMLDivElement>(null);
  const [formValues, setFormValues] = useState({
    email: '',
  });
  const dispatch = useDispatch();
  const validation = useFormWithValidation();
  const history = useHistory();

  const { forgotPasswordSuccess } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    if (forgotPasswordSuccess) {
      history.push("/reset-password");
    }
  }, [forgotPasswordSuccess, history]);


  const { handleChange, errors, isValid, inputsValidity } = validation;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    handleChange(e, [emailRef]);
  };

  useEffect(() => {
    fixUiKitInput({input: emailRef, styleAdditional: 'mt-6'});
  }, [emailRef]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (isValid) {
        dispatch(
          forgotPassword({
            email: formValues.email,
          }),
        );
      }
    },
    [formValues, isValid, dispatch],
  );
  return (
    <>
      <h1 className={`text text_type_main-medium ${forgotFormStyles.heading}`}>
        Восстановление пароля
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
        <div className={`${forgotFormStyles.button_container} mt-6 mb-20`}>
          <Button type={isValid ? 'primary' : 'secondary'} size="large">
            Восстановить
          </Button>
        </div>
      </Form>
      <p className={`text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?{' '}
        <Link className={forgotFormStyles.link} to={'/login'}>
          Войти
        </Link>
      </p>
    </>
  );
}
