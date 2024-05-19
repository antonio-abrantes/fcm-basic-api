const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwtConfig");

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.APP_USER_NAME && password === process.env.APP_USER_PASSWORD) {
    const token = jwt.sign({ username }, secret, { expiresIn });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
};

module.exports = { login };
