const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwtConfig');

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * User login
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {void}
 */
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
