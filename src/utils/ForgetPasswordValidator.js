import { body } from 'express-validator';

const forgetPasswordValidator= 
  [


  body('email')
    .trim()
    .isLength({ max: 30 })
    .escape()
    .notEmpty().withMessage('Email field is required') 
    .isEmail().withMessage('Email is not valid')
    .normalizeEmail(),

  ]

export default forgetPasswordValidator;
