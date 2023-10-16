import { ITextAreaFactory, ITextAreaObject, IRenderTextArea } from '../types';

import { TextArea } from '@ui/TextArea';

export const textAreaFactory = ({
  name,
  value,
  defaultValue = '',
  placeholder = '',
}: ITextAreaFactory): ITextAreaObject => {
  return {
    name,
    value: value || defaultValue,
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
    }: IRenderTextArea) => {
      return (
        <TextArea
          key={key}
          name={name}
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
