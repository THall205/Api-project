// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
      check('username')
      .exists({checkFalsy:true})
      .withMessage('please provide a valid username'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {

      const { firstName,lastName,email, password, username } = req.body;

      const existingUsername = await User.findAll({
        where:{username}
      })
      const existingEmail = await User.findAll({
        where:{email}
      })
      if(existingEmail){
        res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      }
      if(existingUsername){
        res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "username": "User with that username already exists"
          }
        })
      }

      let user = await User.signup({ firstName,lastName,email, username, password });








   let  token = await setTokenCookie(res, user);
      user = user.toJSON()
      user.token = token
      return res.json({
        user,
      });
    }
  );

module.exports = router;
