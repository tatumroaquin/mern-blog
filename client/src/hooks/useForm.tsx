import { useState, useCallback, FormEvent } from 'react';
import { IInputObject, ITextAreaObject, IFormObject, ISelectObject } from '../types';
import { MultiValue, ActionMeta } from 'react-select';

export function useForm(formObject: IFormObject) {
  const [form, setForm] = useState(formObject);

  const isInputValid = useCallback(
    (inputObject: IInputObject | ITextAreaObject | ISelectObject) => {
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

  const onInputChange = useCallback(
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

  const onSelectChange = useCallback(
    (items: MultiValue<{value: string}>, action: ActionMeta<{name: string}>) => {

      let { name } = action;
      if (!name || name.length === 0) name = 'tags';

      const inputObject = { ...form[name] };

      inputObject.value = items.map(item => item.value);

      const isValidInput = isInputValid(inputObject);

      if (!isValidInput && inputObject.valid) inputObject.valid = false;

      if (isValidInput && !inputObject.valid) inputObject.valid = true;

      inputObject.touched = true;

      setForm((currentForm) => ({ ...currentForm, [name!]: inputObject }));
    },
    [form, isInputValid]
  )

  function renderForm() {
    return Object.values(form).map(
      (inputObject: IInputObject | ITextAreaObject | ISelectObject ) => {
        const { type, name, value, valid, errorMessage, placeholder, renderInput, options } =
          inputObject;

          let onChange: any = onInputChange;

          if (type && type.includes('select')) {
            onChange = onSelectChange;
          }
          //TODO: add 'type' field in IInputObject, ITextAreaObject, and ISelectObject
          // use 'type' to determine the whether to use onInputChange or onSelectChange
        return renderInput({
          key: name,
          value,
          errorMessage,
          isValid: valid,
          placeholder,
          onChange,
          options
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

  return { form, renderForm, isFormValid };
}
