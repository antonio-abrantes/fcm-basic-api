const https = require("https");
const { getAccessToken } = require("./tokenService");
const { HOST, PATH } = require("../config/constants");

function sendFcmMessage(fcmMessage) {
  getAccessToken().then((accessToken) => {
    const options = {
      hostname: HOST,
      path: PATH,
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    const request = https.request(options, (resp) => {
      resp.setEncoding("utf8");
      resp.on("data", (data) => {
        console.log("Message sent to Firebase for delivery, response:");
        console.log(data);
      });
    });

    request.on("error", (err) => {
      console.log("Unable to send message to Firebase");
      console.log(err);
    });

    request.write(JSON.stringify(fcmMessage));
    request.end();
  });
}

module.exports = { sendFcmMessage };
