import Form from '../form/form';
import { useRef, useEffect, useState } from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/actions/user';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import fixUiKitInput from '../../utils/uiKitInputFix';
import styles from './profile-form.module.css';

type TUser = {
  user: {
    user: {
      email: string;
      name: string;
      password: string;
    };
  };
};

export default function RegisterForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [formValues, setFormValues] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const user = useSelector((store: TUser) => store.user.user);
  const dispatch = useDispatch();

  const validation = useFormWithValidation();
  const { values, handleChange, errors, inputsValidity } = validation;

  useEffect(() => {
    if (user && emailRef.current && nameRef.current && passwordRef.current) {
      emailRef.current.value = user.email;
      nameRef.current.value = user.name;
      passwordRef.current.value = '';
    }
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    handleChange(e, [nameRef, passwordRef, emailRef]);
  };

  const toggleTextColor = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) ref.current.classList.toggle('text_color_inactive');
  };

  useEffect(() => {
    fixUiKitInput({ input: nameRef, styleAdditional: 'mt-0' });
    fixUiKitInput({ input: emailRef, styleAdditional: 'mt-6' });
    fixUiKitInput({ input: passwordRef, styleAdditional: 'mt-6' });
    if (user && emailRef.current && nameRef.current && passwordRef.current) {
      emailRef.current.value = user.email;
      nameRef.current.value = user.name;
      passwordRef.current.value = '';
    }
    if (emailRef.current && nameRef.current && passwordRef.current) {
      emailRef.current.classList.add('text_color_inactive');
      nameRef.current.classList.add('text_color_inactive');
      passwordRef.current.classList.add('text_color_inactive');
    }
  }, [emailRef, passwordRef, nameRef, user]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      passwordRef?.current?.value &&
      nameRef?.current?.value &&
      emailRef?.current?.value
    )
      dispatch(
        updateUser({
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      );
  };

  // const onSubmitt = (ref: React.RefObject<HTMLInputElement>) => {
  //   if (ref.current && ref.current.name === 'userName') {
  //     dispatch(
  //       updateUser({
  //         name: ref.current.value,
  //         email: user.email,
  //       }),
  //     );
  //   } else if (ref.current && ref.current.name === 'email') {
  //     dispatch(
  //       updateUser({
  //         name: user.name,
  //         email: ref.current.value,
  //       }),
  //     );
  //   } else if (passwordRef.current) {
  //     dispatch(
  //       updateUser({
  //         name: user.name,
  //         email: user.email,
  //         password: passwordRef.current.value,
  //       }),
  //     );
  //   }
  // };

  // const onIconClick = (ref: React.RefObject<HTMLInputElement>) => {
  //   onSubmit(ref);
  // };

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
        // onIconClick={() => {
        //   onIconClick(nameRef);
        // }}
        value={values.userName || user.name}
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
        // onIconClick={() => {
        //   onIconClick(emailRef);
        // }}
        value={values.email || user.email}
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
        // onIconClick={() => {
        //   onIconClick(passwordRef);
        // }}
        value={values.password || ''}
      />
      {inputsValidity.email !== false &&
        inputsValidity.userName !== false &&
        inputsValidity.password && (
          <div className={`${styles.buttons} mt-8`}>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
    </Form>
  );
}
