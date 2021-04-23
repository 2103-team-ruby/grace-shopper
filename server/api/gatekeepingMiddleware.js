const User = require("../db/models/user");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    return next();
  }
  res.send("Sorry you do not have admin privileges");
}

function isCorrectUser(req, res, next) {
  if (req.params.id === req.user.id) {
    return next();
  }
  res.send("Incorrect Username or Password");
}

function isCorrectUserOrAdmin(req, res, next) {
  if (isAdmin || isCorrectUser) {
    return next();
  }
  res.send("You do not have proper permissions");
}

module.exports = {
  requireToken,
  isAdmin,
  isCorrectUser,
  isCorrectUserOrAdmin,
};
