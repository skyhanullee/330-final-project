const isPro = async (req, res, next) => {
  try {
    // if not pro user
    if (!req.user.roles.includes('pro')) {
      res.status(403).send({ message: 'User is not a pro user.' });
    }
    // if pro user
    else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = isPro;
