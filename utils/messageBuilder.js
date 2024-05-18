const { v4: uuidv4 } = require('uuid');

function buildCommonMessage() {
  const messageId = generateMessageId();
  return {
    message: {
      topic: "all-notifications",
      notification: {
        title: "FCM Notification: " + Date.now(),
        body: "Notification from FCM",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgAYEzSp4-dHfYiKb80Dj0uTSK4DGVGj4yxnnnxOjCGdlxLuYhEcrDB-2R0flj6xOBF5E&usqp=CAU"
      },
      data: {
        messageId: messageId,
      },
    },
  };
}

function buildOverrideMessage() {
  const fcmMessage = buildCommonMessage();
  const apnsOverride = {
    payload: {
      aps: {
        badge: 1,
      },
    },
    headers: {
      "apns-priority": "10",
    },
  };

  const androidOverride = {
    notification: {
      click_action: "android.intent.action.MAIN",
    },
  };

  fcmMessage["message"]["android"] = androidOverride;
  fcmMessage["message"]["apns"] = apnsOverride;

  return fcmMessage;
}

function generateMessageId() {
  return uuidv4();
}

module.exports = {
  buildCommonMessage,
  buildOverrideMessage,
};
