import { Select } from '../components/UI/Select';
import { ISelectFactory, IRenderSelect, ISelectObject } from '../types';

export const selectFactory = ({
  label,
  name,
  defaultValue = '',
  placeholder = '',
}: ISelectFactory): ISelectObject => {
  return {
    type: 'select',
    name,
    value: defaultValue,
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
        />
      );
    },
  };
};
