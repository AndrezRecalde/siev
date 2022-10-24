import { useEffect, useMemo, useState } from "react";

export const useForm = (initialState = {}, formValidations = {}) => {
  const [values, setValues] = useState(initialState);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [values]);

  useEffect(() => {
    setValues(initialState);
  }, [initialState]);

  const reset = () => {
    setValues(initialState);
  };

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  }

  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(formValidations))
    {
        const [ fn, errorMessage ] = formValidations[formField];

        formCheckedValues[`${ formField }Valid`] = fn( values[formField] ) ? null : errorMessage;
    }
    setFormValidation( formCheckedValues );
  }

  return {
    ...values,
    values,
    handleInputChange,
    reset,

    ...formValidation,
    isFormValid
  }
};
