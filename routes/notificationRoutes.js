const express = require("express");
const {
  sendNotification,
  subscribeToTopic,
  sendNotificationWithAxios,
  unsubscribeToTopic,
} = require("../controllers/notificationController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/send-notification", authenticate, sendNotification);
router.post("/subscribe-to-topic", subscribeToTopic);
router.post("/unsubscribe-to-topic", unsubscribeToTopic);
router.post("/send-fcm-notification", authenticate, sendNotificationWithAxios);

module.exports = router;
