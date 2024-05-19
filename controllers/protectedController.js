/**
 * Protected endpoint
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {void}
 */
const protectedEndpoint = (req, res) => {
  res.status(200).send('Acesso autorizado ao endpoint protegido!');
};

module.exports = { protectedEndpoint };