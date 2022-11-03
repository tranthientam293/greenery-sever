const jwt = require("jsonwebtoken");

const verifyToken = function (req, res, next) {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, function (err, user) {
      if (err) {
        return res.status(400).json({ message: "Token is not valid!" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "You are not authenticated" });
  }
};

const verifyTokenAndAthorization = function (req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.id === req.params.userId) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorization!" });
    }
  });
};

const verifyTokenAndAdmin = function (req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.id === req.params.userId && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorization!" });
    }
  });
};

module.exports = {
  verifyTokenAndAthorization,
  verifyTokenAndAdmin,
  verifyToken,
};
