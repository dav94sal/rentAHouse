const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { User } = require('../db/models')

// middleware for formatting  errors from express-validator middleware
const handleValidationErrors = (req,res,next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateSpot = [
  check('address')
    .exists({checkFalsy: true})
    .withMessage("Street address is required"),
  check('city')
    .exists({checkFalsy: true})
    .withMessage("City is required"),
  check('state')
    .exists({checkFalsy: true})
    .withMessage("State is required"),
  check('country')
    .exists({checkFalsy: true})
    .withMessage("Country is required"),
  check('lat')
    .exists({checkFalsy: true})
    .isFloat({ min: -90, max: 90})
    .withMessage("Latitude must be within -90 and 90"),
  check('lng')
    .exists({checkFalsy: true})
    .isFloat({ min: -180, max: 180})
    .withMessage("Longitude must be within -180 and 180"),
  check('name')
    .exists({checkFalsy: true})
    .isLength({ min: 3, max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .exists({checkFalsy: true})
    .withMessage("Description is required"),
  check('price')
    .exists({checkFalsy: true})
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors
]

const validateReview = [
  check('review')
    .exists({checkFalsy: true})
    .withMessage("Review text is required"),
  check('stars')
    .exists({checkFalsy: true})
    .isInt({min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]

const today = Date.now();
const validateBooking = [
  check('startDate')
    .exists({checkFalsy: true})
    .isDate()
    .isAfter(new Date(today).toDateString())
    .withMessage("startDate cannot be in the past")
    .toDate(),
  check('endDate')
    .exists({ checkFalsy: true })
    .toDate()
    .custom((endDate, { req }) => {
      if (endDate.getTime() <= req.body.startDate.getTime()) {
        throw new Error("endDate cannot be on or before startDate");
      }
      return true;
    }),
    handleValidationErrors
]

const validateQueryParams = [
  check('page')
    .if((value, { req }) => req.query.page)
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  check('size')
    .if((value, { req }) => req.query.size)
    .isInt({ min: 1, max: 20 })
    .withMessage("Size must be between 1 and 20"),
  check('maxLat')
    .if((value, { req }) => req.query.maxLat)
    .isFloat({ min: -90, max: 90 })
    .withMessage("Maximum latitude is invalid"),
  check('minLat')
    .if((value, { req }) => req.query.minLat)
    .isFloat({ min: -90, max: 90 })
    .withMessage("Minimum latitude is invalid"),
  check('minLng')
    .if((value, { req }) => req.query.minLng)
    .isFloat({ min: -180, max: 180 })
    .withMessage("Minimum longitude is invalid"),
  check('maxLng')
    .if((value, { req }) => req.query.maxLng)
    .isFloat({ min: -180, max: 180 })
    .withMessage("Maximum longitude is invalid"),
  check('maxPrice')
    .if((value, { req }) => req.query.maxPrice)
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  check('minPrice')
    .if((value, { req }) => req.query.minPrice)
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  handleValidationErrors
]

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({checkFalsy: true})
    .withMessage('First Name is required'),
  check('lastName')
    .exists({checkFalsy: true})
    .withMessage('Last Name is required'),
  handleValidationErrors
];

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

const userExists = async function(username, email) {
  const usernameExists = await User.findAll({ where: { username } });
  const emailExists = await User.findAll({ where: { email } });

  if (usernameExists.length > 0) {
    return {"username": "User with that username already exists"}
  }
  else if (emailExists.length > 0) {
    return {"email": "User with that email already exists"}
  } else return false;
}

const hasExistingBooking = async function (spot, startDate, endDate) {
  // console.log(spot)
  const bookings = await spot.getBookings({});
  startDate = startDate.getTime();
  endDate = endDate.getTime();
  const errors = {};

  for (let booking of bookings) {
    const start = new Date(booking.startDate).getTime();
    const end = new Date(booking.endDate).getTime();

    // startDate within an existing booking
    if (startDate >= start && startDate <= end) {
      errors.startDate = "Start date conflicts with an existing booking"
    }
    // endDate within an existing booking
    if (endDate >= start && endDate <= end) {
      errors.endDate = "End date conflicts with an existing booking"
    }
    // startDate and EndDate surround existing booking
    if (
      start >= startDate &&
      start <= endDate &&
      end <= endDate &&
      end >= startDate
    ) {
      errors.startDate = "Start date conflicts with an existing booking"
      errors.endDate = "End date conflicts with an existing booking"
    }

    // if errors has key value pairs return errors
    if (errors.startDate || errors.endDate) return errors;
    return false;
  }
}

module.exports = {
  handleValidationErrors,
  validateSpot,
  validateReview,
  validateBooking,
  validateQueryParams,
  validateSignup,
  validateLogin,
  hasExistingBooking,
  userExists
 };
