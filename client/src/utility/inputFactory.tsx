import { IInputFactory, IInputObject, IRenderInput } from '../types';

import { Input } from '@ui/Input';

export const inputFactory = ({
  label,
  name,
  type,
  defaultValue = '',
  placeholder = '',
}: IInputFactory): IInputObject => {
  return {
    name,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    placeholder,
    touched: false,
    renderInput: ({
      key,
      value,
      placeholder,
      errorMessage,
      isValid,
      onChange,
    }: IRenderInput) => {
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          value={value}
          placeholder={placeholder}
          isValid={isValid}
          errorMessage={errorMessage}
          onChange={onChange}
        />
      );
    },
  };
};
