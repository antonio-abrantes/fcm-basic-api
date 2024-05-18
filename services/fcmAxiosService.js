const axios = require('axios');
const { getAccessToken } = require('./tokenService');
const { SEND_CLOUD_MESSAGE } = require('../config/constants');

async function sendFcmMessageWithAxios(fcmMessage) {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(
      `${SEND_CLOUD_MESSAGE}`,
      fcmMessage,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Message sent to Firebase for delivery, response:');
    console.log(response.data);
  } catch (error) {
    console.error('Unable to send message to Firebase', error.response.data);
  }
}

module.exports = { sendFcmMessageWithAxios };
