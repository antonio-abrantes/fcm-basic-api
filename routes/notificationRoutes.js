/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notifications related endpoints
 */

const express = require("express");
const {
  sendNotification,
  subscribeToTopic,
  sendNotificationWithAxios,
  unsubscribeToTopic,
} = require("../controllers/notificationController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /send-notification:
 *   post:
 *     summary: Envia uma notificação
 *     description: Envia uma notificação utilizando FCM
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Tipo de mensagem a ser enviada (common-message ou override-message)
 *     responses:
 *       200:
 *         description: Mensagem enviada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Parâmetro "message" é obrigatório
 */
router.post("/send-notification", authenticate, sendNotification);

/**
 * @swagger
 * /subscribe-to-topic:
 *   post:
 *     summary: Inscreve um dispositivo em um tópico
 *     description: Inscreve um dispositivo em um tópico utilizando FCM
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token do dispositivo
 *               topic:
 *                 type: string
 *                 description: Tópico para inscrição
 *     responses:
 *       200:
 *         description: Dispositivo inscrito no tópico com sucesso
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Erro ao inscrever dispositivo no tópico
 */
router.post("/subscribe-to-topic", subscribeToTopic);

/**
 * @swagger
 * /unsubscribe-to-topic:
 *   post:
 *     summary: Remove um dispositivo de um tópico
 *     description: Remove um dispositivo de um tópico utilizando FCM
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token do dispositivo
 *               topic:
 *                 type: string
 *                 description: Tópico para remover a inscrição
 *     responses:
 *       200:
 *         description: Dispositivo removido do tópico com sucesso
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Erro ao remover dispositivo do tópico
 */
router.post("/unsubscribe-to-topic", unsubscribeToTopic);

/**
 * @swagger
 * /send-fcm-notification:
 *   post:
 *     summary: Envia uma notificação utilizando Axios
 *     description: Envia uma notificação utilizando Axios para se comunicar com FCM
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Tipo de mensagem a ser enviada (common-message ou override-message)
 *     responses:
 *       200:
 *         description: Mensagem enviada com sucesso usando Axios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Parâmetro "message" é obrigatório
 */
router.post("/send-fcm-notification", authenticate, sendNotificationWithAxios);

module.exports = router;
