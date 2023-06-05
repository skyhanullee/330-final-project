const isAdmin = async (req, res, next) => {
  try {
    // if not admin
    if (!req.user.roles.includes('admin')) {
      res.status(403).send('User is not an admin.');
    }
    // if admin
    else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = isAdmin;
