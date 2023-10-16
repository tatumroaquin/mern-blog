import { ChangeEventHandler, FormEvent } from 'react';
import { MultiValue } from 'react-select';

export interface IInputElement {
  className?: string;
  defaultValue?: string;
  errorMessage?: string;
  isValid: boolean;
  name: string;
  placeholder?: string;
  type?: string;
  value?: string | any[];
  label?: string;
}

export interface IInput extends IInputElement {
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export interface ITextArea extends IInputElement {
  // onChange: (e: FormEvent<HTMLInputElement>) => void;
  onChange: ChangeEventHandler<HTMLTextAreaElement>
}

export interface IOptionType {
  label: string;
  value: string;
}

export interface ISelect {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage: string;
  isValid: boolean;
  // onChange: (newValue: MultiValue<typeof Option>) => void;
  onChange: (items: MultiValue<IOptionType> ) => void;
  // defaultValue?: Array<{ [x: string]: any }>;
  defaultValue?: MultiValue<IOptionType>;
}

export interface IRenderElement {
  key: string;
  value?: string | any[];
  placeholder?: string;
  errorMessage: string;
  isValid: boolean;
}

export interface IRenderInput extends IRenderElement {
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  value?: string | string[];
}

export interface IRenderTextArea extends IRenderElement {
  onChange: (e: FormEvent<HTMLTextAreaElement>) => void;
}

export interface IRenderSelect extends IRenderElement {
  // onChange: (items: MultiValue<typeof Option>) => void;
  onChange: (items: MultiValue<IOptionType>) => void;
  // defaultValue?: Array<{ [x: string]: any }>;
  defaultValue?: MultiValue<IOptionType>;
}

export interface IFactoryElement {
  type?: string;
  name: string;
  value?: string | string[];
  defaultValue?: string | any;
  placeholder?: string;
}

export interface IInputFactory extends IFactoryElement {
  label: string;
}

export interface ITextAreaFactory extends IFactoryElement {
  defaultValue?: string;
}

export interface ISelectFactory extends IFactoryElement {
  label: string;
  // defaultValue?: Array<{ [x: string]: any }>;
  defaultValue?: MultiValue<IOptionType>;
}

export interface IValidationRule {
  name: string;
  errorMessage: string;
  validate: (inputValue: string | any[], formObject: IFormObject) => boolean;
}

export interface IFormObjectElement {
  type?: string;
  name: string;
  value: string | string[];
  valid: boolean;
  errorMessage: string;
  touched: boolean;
  placeholder?: string;
  validationRules?: IValidationRule[];
  // defaultValue?: Array<{ [x: string]: any }>;
  defaultValue?: MultiValue<IOptionType>;
}

export interface IInputObject extends IFormObjectElement {
  renderInput: ({
    key,
    value,
    placeholder,
    errorMessage,
    isValid,
    onChange,
  }: IRenderInput) => JSX.Element;
}

export interface ITextAreaObject extends IFormObjectElement {
  renderInput: ({
    key,
    value,
    placeholder,
    errorMessage,
    isValid,
    onChange,
  }: IRenderTextArea) => JSX.Element;
}

export interface ISelectObject extends IFormObjectElement {
  renderInput: ({
    key,
    placeholder,
    errorMessage,
    isValid,
    onChange,
  }: IRenderSelect) => JSX.Element;
}

export interface IFormObject {
  [field: string]: IInputObject | ITextAreaObject | ISelectObject;
}
