import { body } from 'express-validator';

const registerValidator = 
  [
    body('username')
    .trim()
    .notEmpty().withMessage('Username field is required') , 
    // .isLowercase().withMessage('Username must be in lowercase'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email field is required') 
    .isEmail().withMessage('Email is not valid')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password field is required'),

  body('address.country')
    .optional({ checkFalsy: true })
    .isString().withMessage('Country must be a string'),

  body('address.city')
    .optional({ checkFalsy: true })
    .isString().withMessage('City must be a string'),

  // body('profileImage')
  //   .optional({ checkFalsy: true })
  //   .isURL().withMessage('Profile Image must be a valid URL'),

  body('contactNo')
    .notEmpty().withMessage('Contact Number field is required')
    .isNumeric().withMessage('Contact Number must be numeric'),
];

export default registerValidator;
