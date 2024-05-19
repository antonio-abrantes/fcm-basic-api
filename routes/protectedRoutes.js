const express = require('express');
const { protectedEndpoint } = require('../controllers/protectedController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Protected endpoint
 *     tags: [Protected]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful access
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 */
router.get('/protected', authenticate, protectedEndpoint);

module.exports = router;
