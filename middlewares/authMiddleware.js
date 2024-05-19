const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwtConfig");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }

      req.user = decoded;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authenticate };
