import { check, header, query } from 'express-validator';

export const createPostValidator = [
  header('authorization')
    .contains('Bearer')
    .withMessage('Access token not found'),
  check('title')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Post title missing')
    .isAscii()
    .withMessage('Post title contains invalid characters'),
  check('markdown')
    .notEmpty()
    .withMessage('Your post has no content')
    .isString()
    .withMessage('Markdown must be a string'),
  check('description').optional().escape(),
];

export const getPostBySlugValidator = [
  check('postSlug')
    .notEmpty()
    .withMessage('You must specify a post slug')
    .isSlug()
    .withMessage('Post slug must be a valid slug'),
];

export const getPostByUserIdValidator = [
  check('userId')
    .escape()
    .notEmpty()
    .withMessage('You must specify a User ID')
    .isHexadecimal()
    .withMessage('User ID must be valid hex'),
];

export const getAllPostsValidator = [
  query('page')
    .optional()
    .isInt({ allow_leading_zeroes: false })
    .withMessage('Page numbers must be integers without leading zeros'),
  query('limit')
    .optional()
    .isInt({ allow_leading_zeroes: false })
    .withMessage('Limit numbers must be integers without leading zeros'),
];

export const updatePostValidator = [
  header('authorization')
    .contains('Bearer')
    .withMessage('Access token not found'),
  check('userId')
    .notEmpty()
    .withMessage('User IDs must be linked with posts')
    .isHexadecimal()
    .withMessage('User ID is not a valid hexadecimal string'),
  check('title')
    .escape()
    .blacklist('`;\'"(){}/')
    .notEmpty()
    .withMessage('Please specify a post title'),
  check('markdown')
    .notEmpty()
    .withMessage('Your post has no content')
    .isString()
    .withMessage('Markdown must be a string'),
  check('description').optional().escape(),
];

export const deletePostValidator = [
  header('authorization')
    .contains('Bearer')
    .withMessage('Access token not found'),
  check('postSlug')
    .notEmpty()
    .withMessage('You must specify a post slug')
    .isSlug()
    .withMessage('A slug must be a valid slug'),
];

export const searchPostsValidator = [
  query('q')
    .isString()
    .withMessage('Search query must be a string')
    .isAscii()
    .withMessage('Search query can only use ASCII characters')
    .isLength({ max: 50 })
    .withMessage('Search query must NOT exceed 50 characters')
    .escape(),
  query('page')
    .optional()
    .isInt({ allow_leading_zeroes: false })
    .withMessage('Page numbers must be integers without leading zeros'),
  query('limit')
    .optional()
    .isInt({ allow_leading_zeroes: false })
    .withMessage('Limit numbers must be integers without leading zeros'),
];
