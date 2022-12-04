var admin = require("firebase-admin");

const serviceAccount = {
  "type": process.env.FIREBASE_TYPE.toString(),
  "project_id": process.env.FIREBASE_PROJECT_ID.toString(),
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID.toString(),
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL.toString(),
  "client_id": process.env.FIREBASE_CLIENT_ID.toString(),
  "auth_uri": process.env.FIREBASE_AUTH_URI.toString(),
  "token_uri": process.env.FIREBASE_TOKEN_URI.toString(),
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_CERT_URI.toString(),
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URI.toString()
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;