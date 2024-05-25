const { sendFcmMessage } = require("../services/fcmService");
const { sendFcmMessageWithAxios } = require("../services/fcmAxiosService");
const { buildCommonMessage, buildOverrideMessage, buildNotification } = require("../utils/messageBuilder");
const admin = require("../config/firebaseConfig");

const sendNotification = (req, res) => {
  const { message } = req.body;

  if (message && message === "common-message") {
    const commonMessage = buildCommonMessage();
    sendFcmMessage(commonMessage);
    res.status(200).json({
      success: true,
      message: "Mensagem enviada com sucesso",
      data: JSON.stringify(commonMessage, null, 2),
    });
  } else if (message && message === "override-message") {
    const overrideMessage = buildOverrideMessage();
    sendFcmMessage(overrideMessage);
    res.status(200).json({
      success: true,
      message: "Mensagem enviada com sucesso",
      data: JSON.stringify(overrideMessage, null, 2),
    });
  } else {
    res.status(400).json({ success: false, message: 'Parâmetro "message" é obrigatório' });
  }
};

const sendNotificationWithAxios = async (req, res) => {
  try {
    const { message } = req.body;
    if (message) {
      const commonMessage = buildNotification(message);
      await sendFcmMessageWithAxios(commonMessage);
      res.status(200).json({
        success: true,
        message: "Mensagem enviada com sucesso",
        data: commonMessage,
      });
    } else {
      res.status(400).json({ success: false, message: 'Parâmetros obrigatórios não preenchidos' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao enviar a notificação', error: error.message });
  }
};

const subscribeToTopic = async (req, res) => {
  const { token, topic } = req.body;
  const defaultTopic = 'all-notifications';
  const finalTopic = topic || defaultTopic;

  try {
    await admin.messaging().subscribeToTopic(token, finalTopic);
    res.status(200).send('Dispositivo inscrito no tópico com sucesso.');
  } catch (error) {
    console.error('Erro ao inscrever dispositivo no tópico:', error);
    res.status(500).send('Erro ao inscrever dispositivo no tópico.');
  }
};

const unsubscribeToTopic = async (req, res) => {
  const { token, topic } = req.body;
  const defaultTopic = 'all-notifications';
  const finalTopic = topic || defaultTopic;

  try {
    await admin.messaging().unsubscribeFromTopic(token, finalTopic);
    res.status(200).send('Dispositivo removido do tópico com sucesso.');
  } catch (error) {
    console.error('Erro ao remover dispositivo do tópico:', error);
    res.status(500).send('Erro ao remover dispositivo do tópico.');
  }
};

module.exports = {
  sendNotification,
  sendNotificationWithAxios,
  subscribeToTopic,
  unsubscribeToTopic,
};
