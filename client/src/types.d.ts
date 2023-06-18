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

export interface ICreateInput {
  label: string;
  name: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
}

export interface IRenderInput {
  key: string;
  value?: string;
  placeholder?: string;
  errorMessage: string;
  isValid: boolean;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export interface IUseInput {
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
  label: string;
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

// export interface IInputObject {
//   name: string;
//   placeholder?: string;
//   valid: boolean;
//   value: string;
//   errorMessage: string;
//   touched?: boolean;
//   renderInput: ({
//     key,
//     value,
//     isValid,
//     errorMessage,
//     onChange,
//   }: IRenderInput) => JSX.Element;
//   validationRules?: IValidationRule[];
}

export interface IFormObject {
  [field: string]: IInputObject;
}
