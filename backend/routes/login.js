const { Router } = require("express");
const router = Router();
const userDAO = require('../daos/user');
const isAuthorized = require('../middleware/isAuthorized');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

// Signup: POST /login/signup
// create user record with email and password stored
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, roles } = req.body;
    if (!email) {
      return res.status(400)({ message: 'No email given.' });
    }

    if (!password) {
      return res.status(400).send({ message: 'No password given.' });
    }

    const existingUser = await userDAO.getUser(email);
    if (existingUser) {
      return res.status(409).send({ message: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await userDAO.createUser({
      email: email,
      password: hashedPassword,
      roles: ['user'],
    });

    res.json(newUser);
  }
  catch (e) {
    next(e);
  }
});

// Login: POST /login
router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      return res.status(400).send({ message: 'Password not found.' });
    }
    const user = await userDAO.getUser(email);
    if (!user) {
      return res.status(401).send({ message: 'User not found.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ message: 'Incorrect password.' });
    }

    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      roles: user.roles
    }, process.env.JWT_SECRET_KEY);

    // set authorization for user
    req.headers.authorization = `Bearer ${token}`;
    // res.cookie("token", token, { httpOnly: true })
    console.log(`POST /LOGIN: {$req.headers.authorization}`);

    return res.json({ token: token });
  }
  catch (e) {
    next(e);
  }
});

// Change Password POST /login/password
router.post("/password", isAuthorized, async (req, res, next) => {
  try {
    const user = req.user;
    const { password } = req.body;
    if (!user) {
      return res.status(401).send({ message: 'User is not authenticated yet.' });
    }

    if (!password) {
      return res.status(400).send({ message: 'Something wrong with password.' });
    }
    else {
      const newHashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const isUserUpdated = await userDAO.updateUserPassword(user._id, newHashedPassword);
      if (!isUserUpdated) {
        return res.status(401).send({ message: 'Password did not update' });
      }
      else {
        return res.status(200).send({ message: 'User password is updated.' });
      }
    }
  }
  catch (e) {
    next(e);
  }
});

// [LOGOUT MUST BE HANDLED IN THE FRONT END]
// [with the way jwt works, server side does not handle logout, delete jwt token from frontend]
// // POST /logout 
// // if the user is logged in, invalidate their token so they can't use it again (remove it)
// router.post("/logout", isAuthorized, async (req, res, next) => {
//   try {
//     if (!req.user) {
//       return res.status(401).send('Token does not match.');
//     }
//     else {
//       // remove token from local storage
//       // global.localStorage.removeItem('token');
//       // console.log(req.headers.authorization);
//       // const isTokenExist = global.localStorage?.getItem('token');
//       // const isTokenExist = clearCookie('token');
//       // console.log(isTokenExist);
//       req.headers.authorization = ''; // this does not work.
//       console.log(req.user);
//       // if (!isTokenExist) {
//       //   res.status(401).send('Logout went wrong.');
//       // }
//       // else {
//       //   res.status(200).send('Logout successful.');
//       // }
//       res.status(200).send('Logout was called');
//     }
//   }
//   catch (e) {
//     console.log(e);
//     next(e);
//   }
// });

module.exports = router;
