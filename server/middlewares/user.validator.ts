import { check } from 'express-validator';

export const userSignUpValidator = [
  check('firstName').isAlpha().withMessage('First name must be a valid name'),
  check('lastName').isAlpha().withMessage('Last name must be a valid name'),
  check('userName')
    .isLength({ min: 5 })
    .matches(/^[a-zA-Z0-9\-_.]+$/g)
    .withMessage(
      'Usernames must be 5 characters minimum, and consist of letters, numbers, dashes, underscores, or periods'
    ),
  check('email').isEmail().withMessage('Invalid email address'),
  check('password')
    .isLength({ min: 10 })
    .withMessage('Password needs to be 10 characters or longer'),
];

export const userSignInValidator = [
  check('email').isEmail().withMessage('No user exists with that email'),
  check('password').notEmpty().withMessage('Please enter your password')
];

export const editUserValidator = [
  check('firstName').notEmpty().withMessage('First name must be a valid name'),
  check('lastName').notEmpty().withMessage('Last name must be a valid name'),
  check('userName')
    .isLength({ min: 5 })
    .matches(/^[a-zA-Z0-9\-_.]+$/g)
    .withMessage(
      'Usernames must be 5 characters minimum, and consist of letters, numbers, dashes, underscores, or periods'
    ),
  check('email').isEmail().withMessage('Invalid email address'),
  check('oldPassword')
    .notEmpty()
    .withMessage('Password needs to be 10 characters or longer'),
]
