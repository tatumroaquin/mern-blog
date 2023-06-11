import { check } from 'express-validator';

export const createPostValidator = [
  check('title').notEmpty().withMessage('Please specify a post title'),
  check('markdown').notEmpty().withMessage('Your post has no content'),
];

export const getPostBySlugValidator = [
  check('postSlug').notEmpty().withMessage('You must specify a post slug'),
];

export const getPostByUserIdValidator = [
  check('userId').notEmpty().withMessage('You must specify a user id'),
];

export const updatePostValidator = [
  check('userId').notEmpty().withMessage('User IDs must be linked with posts'),
  check('title').notEmpty().withMessage('Please specify a post title'),
  check('markdown').notEmpty().withMessage('Your post has no content'),
];

export const deletePostValidator = [
  check('postSlug').notEmpty().withMessage('You must specify a post slug'),
];
