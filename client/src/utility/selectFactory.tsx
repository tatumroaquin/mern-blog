import { Select } from '../components/UI/Select';
import { ISelectFactory, IRenderSelect, ISelectObject } from '../types';

export const selectFactory = ({
  label,
  name,
  placeholder = '',
  defaultValue = [],
}: ISelectFactory): ISelectObject => {
  return {
    type: 'select',
    name,
    value: '',
    defaultValue,
    valid: false,
    errorMessage: '',
    placeholder,
    touched: false,
    renderInput: ({
      key,
      placeholder,
      errorMessage,
      isValid,
      onChange,
      defaultValue,
    }: IRenderSelect) => {
      return (
        <Select
          key={key}
          label={label}
          name={name}
          placeholder={placeholder}
          errorMessage={errorMessage}
          isValid={isValid}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      );
    },
  };
};
