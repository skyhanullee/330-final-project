const jwt = require('jsonwebtoken');
const userDAO = require('../daos/user');

// It should verify the JWT provided in req.headers.authorization
// and put the decoded value on the req object.
const isAuthorized = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || !token.includes('Bearer')) {
      res.status(401).send('No valid token.');
    }
    else {
      const userToken = token.replace('Bearer ', '');
      const authorizedUser = jwt.decode(userToken);
      if (!authorizedUser) {
        return res.status(401).send('Token from user does not exist.')
      }

      const isUserExists = userDAO.getUser(authorizedUser?._id);
      if (!isUserExists) {
        return res.status(401).send('User does not exist.');
      }
      else {
        req.user = {
          _id: authorizedUser._id,
          email: authorizedUser.email,
          roles: authorizedUser.roles
        };
        next();
      }
    }
  }
  catch (e) {
    next(e);
  }
};

module.exports = isAuthorized;
