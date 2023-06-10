const { Router } = require("express");
const router = Router();
const userDAO = require('../daos/user');
const isAuthorized = require('../middleware/isAuthorized');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey';
const SALT_ROUNDS = 12;


// Signup: POST /login/signup
// create user record with email and password stored
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, roles } = req.body;
    if (!email) {
      return res.status(400).send('No email given.');
    }

    if (!password) {
      return res.status(400).send('No password given.');
    }

    const existingUser = await userDAO.getUser(email);
    if (existingUser) {
      return res.status(409).send('Email already exists.');
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
      return res.status(400).send('Password not found.');
    }
    const user = await userDAO.getUser(email);
    if (!user) {
      return res.status(401).send('User not found.');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send('Incorrect password.');
    }

    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      roles: user.roles
    }, SECRET_KEY);
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
      return res.status(401).send('User is not authenticated yet.');
    }

    if (!password) {
      return res.status(400).send('Something wrong with password.');
    }
    else {
      const newHashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const isUserUpdated = await userDAO.updateUserPassword(user._id, newHashedPassword);
      if (!isUserUpdated) {
        return res.status(401).send('Password did not update');
      }
      else {
        return res.status(200).send('User password is updated.');
      }
    }
  }
  catch (e) {
    next(e);
  }
});

module.exports = router;
