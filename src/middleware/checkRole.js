const checkRole = (role) => (req, res, next) => {
  if (req.user.role.toLowerCase() !== role) {
    return res.status(403).send("Insufficient Permissions");
  }
  next();
};

module.exports = { checkRole };
