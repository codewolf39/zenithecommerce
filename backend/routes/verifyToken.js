const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.PAS_SEC, (err, user) => {
      if (err) return res.status(403).json("Invalid token");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authorized");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to access this");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to access this");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
