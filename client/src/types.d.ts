export interface IInput {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  isValid: boolean;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export interface IRenderInput {
  key: string;
  value?: string;
  placeholder?: string;
  errorMessage: string;
  isValid: boolean;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export interface IInputFactory {
  label: string;
  name: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
}

export interface IValidationRule {
  name: string;
  errorMessage: string;
  validate: (inputValue: string, formObject?: IFormObject) => boolean;
}

export interface IInputObject {
  name: string;
  value: string;
  valid: boolean;
  errorMessage: string;
  touched: boolean;
  placeholder?: string;
  renderInput: ({
    key,
    value,
    placeholder,
    errorMessage,
    isValid,
    onChange,
  }: IRenderInput) => JSX.Element;
  validationRules?: IValidationRule[]
}

export interface ITextArea {
  name: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  className?: string;
  defaultValue?: string;
  isValid: boolean;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export interface IRenderTextArea {
  key: string;
  value?: string;
  placeholder?: string;
  errorMessage: string;
  isValid: boolean;
  onChange: (e: FormEvent<HTMLTextAreaElement>) => void;
}

export interface ITextAreaObject {
  name: string;
  value: string;
  valid: boolean;
  errorMessage: string;
  touched: boolean;
  placeholder?: string;
  renderInput: ({
    key,
    value,
    placeholder,
    errorMessage,
    isValid,
    onChange,
  }: IRenderTextArea) => JSX.Element;
  validationRules?: IValidationRule[]
}

export interface ITextAreaFactory {
  name: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
}


export interface IFormObject {
  [field: string]: IInputObject | ITextAreaObject;
}
