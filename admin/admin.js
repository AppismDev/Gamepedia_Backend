require('dotenv').config()
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.RTDB_URL,
});

var rtdb = admin.database();

module.exports = {
  admin,
  rtdb,
};
