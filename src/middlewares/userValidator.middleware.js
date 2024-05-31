import {validationResult} from 'express-validator'
const validate = (req, res, next) => {
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
      }
    return next();
};

export {validate}