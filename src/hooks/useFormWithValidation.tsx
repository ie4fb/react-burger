import React from 'react';

function useFormWithValidation() {
  const [values, setValues] = React.useState<{ [key: string]: string }>({});
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [inputsValidity, setInputsValidity] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [formInputsCount, setFormInputsCount] = React.useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputs: React.RefObject<HTMLDivElement>[],
  ) => {
    setFormInputsCount(inputs.length);
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
    if (name === 'password' && value.length < 5) {
      setErrors({
        ...errors,
        [name]: 'Длина пароля должна быть более 4 символов',
      });
      setInputsValidity({ ...inputsValidity, [name]: false });
    } else if (name === 'userName' && value.length < 2) {
      setErrors({
        ...errors,
        [name]: 'Длина имени должна быть более 1 символа',
      });
      setInputsValidity({ ...inputsValidity, [name]: false });
    } else if (name === 'securityCode' && value.length < 1) {
      setErrors({
        ...errors,
        [name]: 'Поле не может быть пустым',
      });
      setInputsValidity({ ...inputsValidity, [name]: false });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
      setInputsValidity({ ...inputsValidity, [name]: target.checkValidity() });
    }
  };
  const resetPassword = () => {
    setValues({...values, password: ''})
  };
  React.useEffect(() => {
    if (
      Object.keys(values).length === formInputsCount &&
      Object.keys(values).length !== 0
    ) {
      setIsValid(
        !Object.keys(inputsValidity).find(key => inputsValidity[key] === false),
      );
    }
  }, [inputsValidity, values, formInputsCount]);

  return {
    handleChange,
    errors,
    isValid,
    inputsValidity,
    values,
    resetPassword
  };
}

export default useFormWithValidation;
