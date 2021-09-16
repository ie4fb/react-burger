import Form from '../form/form';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useCallback, useState } from 'react';
import profileFormStyles from './profile-form.module.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../services/actions/user';
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

  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();


  const validation = useFormWithValidation();
  const { values, handleChange, errors, isValid, inputsValidity } = validation;

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    handleChange(e, [nameRef, passwordRef, emailRef]);
  };

  const toggleTextColor = ref => {
    ref.current.classList.toggle('text_color_inactive');
  };

  useEffect(() => {
    fixUiKitInput(nameRef);
    fixUiKitInput(emailRef, 'mt-6');
    fixUiKitInput(passwordRef, 'mt-6');
    if (user) {
      emailRef.current.value = user.email;
      nameRef.current.value = user.name;
      passwordRef.current.value = '';
    }
    emailRef.current.classList.add('text_color_inactive');
    nameRef.current.classList.add('text_color_inactive');
    passwordRef.current.classList.add('text_color_inactive');
  }, [emailRef, passwordRef, nameRef, user]);

  const onSubmit = ref => {
    if (ref.current.name === 'userName') {
      dispatch(
      updateUser({
        name: ref.current.value,
        email: user.email,
        password: passwordRef.current.value,
      }));
    } else if (ref.current.name === 'email') {
      dispatch(
      updateUser({
        name: user.name,
        email: ref.current.value,
        password: passwordRef.current.value,
      }));
    } else {
      dispatch(
      updateUser({
        name: user.name,
        email: user.email,
        password: passwordRef.current.value,
      }));
    }
  };

  const onIconClick = ref => {
    onSubmit(ref);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        error={inputsValidity.userName !== false ? false : true}
        errorText={inputsValidity.userName ? undefined : errors.userName}
        onChange={onChange}
        ref={nameRef}
        type="text"
        placeholder="Имя"
        name="userName"
        icon="EditIcon"
        size={'default'}
        onFocus={() => toggleTextColor(nameRef)}
        onBlur={() => toggleTextColor(nameRef)}
        onIconClick={() => {
          onIconClick(nameRef);
        }}
      />
      <Input
        error={inputsValidity.email !== false ? false : true}
        errorText={inputsValidity.email ? undefined : errors.email}
        onChange={onChange}
        ref={emailRef}
        type="email"
        placeholder="Логин"
        name="email"
        icon="EditIcon"
        size={'default'}
        onFocus={() => toggleTextColor(emailRef)}
        onBlur={() => toggleTextColor(emailRef)}
        onIconClick={() => {
          onIconClick(emailRef);
        }}
      />
      <Input
        error={inputsValidity.password ? false : true}
        errorText={inputsValidity.password ? undefined : errors.password}
        onChange={onChange}
        ref={passwordRef}
        type={isPasswordHidden ? 'password' : 'text'}
        placeholder="Пароль"
        name="password"
        icon="EditIcon"
        size={'default'}
        onFocus={() => toggleTextColor(passwordRef)}
        onBlur={() => toggleTextColor(passwordRef)}
        onIconClick={() => {
          onIconClick(passwordRef);
        }}
      />
    </Form>
  );
}
