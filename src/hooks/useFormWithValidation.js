import React from 'react';

function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [inputsValidity, setInputsValidity] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [formInputsCount, setFormInputsCount] = React.useState(0);

  const handleChange = (e, inputs) => {
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

  const resetForm = React.useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsValid = false,
      newInputsValidity = {},
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setInputsValidity(newInputsValidity);
    },
    [setValues, setErrors, setIsValid, setInputsValidity],
  );

  const resetInput = e => {
    const name = e.target.previousSibling.name;
    setValues({ ...values, [name]: '' });
    setErrors({ ...errors, [name]: '' });
    setInputsValidity({ ...inputsValidity, [name]: false });
    setIsValid(false);
  };

  return {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    setErrors,
    setValues,
    resetForm,
    resetInput,
    inputsValidity,
  };
}

export default useFormWithValidation;
