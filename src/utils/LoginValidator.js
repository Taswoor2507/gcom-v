import { body } from 'express-validator';

const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email field is required')
    .isEmail().withMessage('Email is not valid')
    .normalizeEmail() , 
  
  body('password')
    .notEmpty().withMessage('Password field is required'),
];

export default loginValidator;
