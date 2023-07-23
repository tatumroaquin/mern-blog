import { IFormObject, IInputObject } from '../../types';
import { inputFactory } from '../../utility/inputFactory';
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  passwordMatchesRule,
} from '../../utility/validator';

export const signUpForm: IFormObject = {
  firstName: {
    ...inputFactory({
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      placeholder: 'Enter First Name',
    }),
    validationRules: [
      requiredRule('firstName'),
      minLengthRule('firstName', 3),
      maxLengthRule('firstName', 25),
    ],
  } as IInputObject,
  lastName: {
    ...inputFactory({
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      placeholder: 'Enter Last Name',
    }),
    validationRules: [
      requiredRule('lastName'),
      minLengthRule('lastName', 3),
      maxLengthRule('lastName', 25),
    ],
  } as IInputObject,
  email: {
    ...inputFactory({
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter Email',
    }),
    validationRules: [requiredRule('email')],
  } as IInputObject,
  username: {
    ...inputFactory({
      label: 'Username',
      name: 'username',
      type: 'text',
      placeholder: 'Enter Username',
    }),
    validationRules: [
      requiredRule('username'),
      minLengthRule('username', 5),
      maxLengthRule('username', 25),
    ],
  } as IInputObject,
  password: {
    ...inputFactory({
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter Password',
    }),
    validationRules: [requiredRule('password'), minLengthRule('password', 8)],
  } as IInputObject,
  confirmPassword: {
    ...inputFactory({
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Retype Password',
    }),
    validationRules: [passwordMatchesRule()],
  } as IInputObject,
};
