import { check, param } from 'express-validator';

export const userSignUpValidator = [
  check('firstName')
    .trim()
    .isAlpha()
    .withMessage('First name must be a valid name'),
  check('lastName')
    .trim()
    .isAlpha()
    .withMessage('Last name must be a valid name'),
  check('userName')
    .trim()
    .isLength({ min: 5 })
    .matches(/^[a-zA-Z0-9\-_.]+$/g)
    .withMessage(
      'Usernames must be 5 characters minimum, and consist of letters, numbers, dashes, underscores, or periods'
    ),
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Emails must be a valid email')
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false,
      outlookdotcom_remove_subaddress: false,
    }),
  check('password')
    .notEmpty()
    .withMessage('Passwords can NOT be empty')
    .isStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    })
    .withMessage(
      'Passwords must be 10-32 characters long, contain: 1 uppercase, 1 lowercase, 1 symbol, and at least 2 numbers.'
    )
    .isLength({ max: 32 })
    .escape(),
];

export const userSignInValidator = [
  check('email')
    .trim()
    .isEmail()
    .withMessage('Emails must be a valid email string')
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false,
      outlookdotcom_remove_subaddress: false,
    }),
  check('password')
    .notEmpty()
    .withMessage('Passwords can NOT be empty')
    .isString()
    .withMessage('Passwords must be a string')
    .escape(),
];

export const editUserValidator = [
  check('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name must NOT be empty')
    .isAlpha()
    .withMessage('First name must only contain letters'),
  check('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name must NOT be empty')
    .isAlpha()
    .withMessage('Last name must only contain letters'),
  check('userName')
    .trim()
    .isLength({ min: 5 })
    .matches(/^[a-zA-Z0-9\-_.]+$/g)
    .withMessage(
      'Usernames must be 5 characters minimum, and consist of letters, numbers, dashes, underscores, or periods'
    ),
  check('email')
    .trim()
    .isEmail()
    .withMessage('Emails must be a valid email string')
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false,
      outlookdotcom_remove_subaddress: false,
    })
    .withMessage('Invalid email address'),
  check('oldPassword')
    .notEmpty()
    .withMessage('Enter current password to edit account')
    .isString()
    .withMessage('Passwords must be a string')
    .isLength({ max: 32 })
    .withMessage('Passwords can not exceed 32 characters')
    .escape(),
  check('newPassword')
    .optional()
    .isStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    })
    .withMessage(
      'Passwords must be 10-32 characters long, contain: 1 uppercase, 1 lowercase, 1 symbol, and at least 2 numbers.'
    )
    .isLength({ max: 32 })
    .withMessage('Passwords can not exceed 32 characters')
    .escape(),
];

export const verifyUserValidator = [
  param('userId')
    .exists()
    .withMessage('User Id is missing from the verification link.')
    .isHexadecimal()
    .withMessage('User Id is not a valid hex string.'),
  param('verifyToken')
    .exists()
    .withMessage('Verification token is missing from the activation link.')
    .isHexadecimal()
    .withMessage('Verification token is not a valid hex string.'),
];
