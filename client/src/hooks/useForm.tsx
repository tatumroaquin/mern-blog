import { useState, useCallback, FormEvent } from 'react';
import { IInputObject, ITextAreaObject, IFormObject } from '../types';

export function useForm(formObject: IFormObject) {
  const [form, setForm] = useState(formObject);

  const isInputValid = useCallback(
    (inputObject: IInputObject | ITextAreaObject) => {
      if (!inputObject.validationRules) return true;

      for (const rule of inputObject.validationRules) {
        if (!rule.validate(inputObject.value, form)) {
          inputObject.errorMessage = rule.errorMessage;
          return false;
        }
      }

      return true;
    },
    [form]
  );

  const onChange = useCallback(
    (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = (e.target as HTMLInputElement | HTMLTextAreaElement);

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
    return Object.values(form).map(
      (inputObject: IInputObject | ITextAreaObject) => {
        const { name, value, valid, errorMessage, placeholder, renderInput } =
          inputObject;
        return renderInput({
          key: name,
          value,
          errorMessage,
          isValid: valid,
          placeholder,
          onChange,
        });
      }
    );
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
