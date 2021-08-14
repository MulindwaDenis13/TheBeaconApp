let admin = require("firebase-admin");

let serviceAccount = require("./auth.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db_firestore = admin.firestore();

module.exports = db_firestore;
