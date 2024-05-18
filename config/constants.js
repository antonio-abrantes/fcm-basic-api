const PORT = process.env.PORT || 4001;
const PROJECT_ID = "proj-flutterflow-01";
const HOST = "fcm.googleapis.com";
const PATH = "/v1/projects/" + PROJECT_ID + "/messages:send";
const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
const SCOPES = [MESSAGING_SCOPE];
const SEND_CLOUD_MESSAGE = "https://fcm.googleapis.com/v1/projects/proj-flutterflow-01/messages:send"

module.exports = {
  PORT,
  PROJECT_ID,
  HOST,
  PATH,
  MESSAGING_SCOPE,
  SCOPES,
  SEND_CLOUD_MESSAGE
};