const { v4: uuidv4 } = require('uuid');

function buildNotification(reqBody) {
  const { title, body } = reqBody.notification;
  if (!title || !body) {
    throw new Error("Os campos 'title' e 'body' são obrigatórios na notificação.");
  }

  const defaultTopic = 'all-notifications';
  const finalTopic = reqBody.topic || defaultTopic;

  const messageId = generateMessageId();

 const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

  return {
    message: {
      topic: finalTopic,
      notification: {
        title: title,
        body: body,
        image: reqBody.notification.image || "https://via.placeholder.com/70"
      },
      data: {
        messageId: messageId,
        category: reqBody.data.category || "Geral",
        date: reqBody.data.date || formattedDate,
        time: reqBody.data.time || formattedTime,
        isRead: reqBody.data.isRead !== undefined ? reqBody.data.isRead : "false"
      },
    },
  };
}


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
  buildNotification,
};
