const { google } = require("googleapis");
const { SCOPES } = require("../config/constants");

function getAccessToken() {
  return new Promise((resolve, reject) => {
    const key = require("../serviceAccountKey.json");
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

module.exports = { getAccessToken };
