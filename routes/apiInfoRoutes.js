const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: 'FCM Basic API',
    version: '1.0.0',
    author: 'Antônio Abrantes',
    documentation: '/docs'
  });
});

module.exports = router;
