import { useState, useCallback, FormEvent } from 'react';
import { IInputObject, IFormObject } from '../types';

export function useForm(formObject: IFormObject) {
  const [form, setForm] = useState(formObject);

  const isInputValid = useCallback((inputObject: IInputObject) => {
    if (!inputObject.validationRules) return true;

    for (const rule of inputObject.validationRules) {
      if (!rule.validate(inputObject.value, form)) {
        inputObject.errorMessage = rule.errorMessage;
        return false;
      }
    }

    return true;
  }, [form]);

  const onChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const { name, value } = e.target as HTMLInputElement;

      const inputObject = { ...form[name] };

      inputObject.value = value;

      const isValidInput = isInputValid(inputObject);

      if (!isValidInput && inputObject.valid) inputObject.valid = false;

      if (isValidInput && !inputObject.valid) inputObject.valid = true;

      inputObject.touched = true;

      setForm((currentForm) => ({ ...currentForm, [name]: inputObject }));
    },
    [form, isInputValid]
  );

  function renderForm() {
    return Object.values(form).map((inputObject: IInputObject) => {
      const { label, value, valid, errorMessage, placeholder, renderInput } =
        inputObject;
      return renderInput({
        key: label,
        value,
        errorMessage,
        isValid: valid,
        placeholder,
        onChange,
      });
    });
  }

  const isFormValid = useCallback(() => {
    const inputObjects = Object.values(form);
    for (const inputObject of inputObjects) {
      if (!inputObject.valid) return false;
    }
    return true;
  }, [form]);

  return { renderForm, isFormValid };
}
