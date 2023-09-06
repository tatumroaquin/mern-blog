import { IFormObject, IValidationRule } from '../types';

function createRule(
  name: string,
  errorMessage: string,
  validatorFunction: (
    inputValue: string | any[],
    formObject: IFormObject
  ) => boolean
): IValidationRule {
  return {
    name,
    errorMessage,
    validate: validatorFunction,
  };
}

export function requiredRule(inputName: string) {
  return createRule(
    'required',
    `${inputName} required`,
    (inputValue, _) => inputValue.length !== 0
  );
}

export function minLengthRule(inputName: string, minLength: number) {
  return createRule(
    'minLength',
    `${inputName} should at least be ${minLength} characters`,
    (inputValue, _) => inputValue.length >= minLength
  );
}

export function maxLengthRule(inputName: string, maxLength: number) {
  return createRule(
    'maxLength',
    `${inputName} should at least be ${maxLength} characters`,
    (inputValue, _) => inputValue.length <= maxLength
  );
}

export function passwordMatchesRule() {
  return createRule(
    'passwordMatches',
    'passwords do not match',
    (inputValue, formObject) => inputValue === formObject.password.value
  );
}

export function newPasswordMatchesRule() {
  return createRule(
    'newPasswordMatches',
    'passwords do not match',
    (inputValue, formObject) => inputValue === formObject.newPassword.value
  );
}
