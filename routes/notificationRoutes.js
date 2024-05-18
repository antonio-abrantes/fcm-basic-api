const express = require('express');
const {
  sendNotification,
  subscribeToTopic,
  sendNotificationWithAxios,
  unsubscribeToTopic,
} = require('../controllers/notificationController');

const router = express.Router();

router.post('/send-notification',sendNotification);
router.post('/subscribe-to-topic', subscribeToTopic);
router.post('/unsubscribe-to-topic', unsubscribeToTopic);
router.post('/send-fcm-notification', sendNotificationWithAxios);

module.exports = router;
