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

function isAdmin( req, res, next) {
  if (req.user.isAdmin) {
    return next();
  }
  res.send("Sorry you do not have admin privileges");
}

module.exports = {
  requireToken,
  isAdmin,
};
