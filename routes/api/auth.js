const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route  GET /api/auth
// @desc   authenticate user
// @access private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      //find user
      const user = await User.findById(req.user.id).select('-password');
      //display user info
      return res.status(200).send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('send error');
    }
  }
);

// @route  POST /api/auth
// @desc   user login
// @access public
router.post(
  '/',
  [
    //email must be valid
    check('email', 'email is required').notEmpty(),
    //password must be at least 6 char
    check('password', 'password is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email & password are invalid' }] });
      }

      //check if password is valid
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email & password are invalid' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '1d' },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token: 'Bearer ' + token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
