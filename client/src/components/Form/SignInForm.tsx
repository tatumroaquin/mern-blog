import { IFormObject, IInputObject } from '../../types';
import { inputFactory } from '../../utils/inputFactory';
import { requiredRule } from '../../utils/validator';

export const signInForm: IFormObject = {
  email: {
    ...inputFactory({
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter Email',
    }),
    validationRules: [requiredRule('email')],
  } as IInputObject,
  password: {
    ...inputFactory({
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter Password',
    }),
    validationRules: [requiredRule('password')],
  } as IInputObject,
};
