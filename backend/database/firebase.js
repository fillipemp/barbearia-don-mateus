// Conexão com o Firebase Firestore (banco de dados NoSQL).
//
// Em produção (Render), as credenciais ficam na variável de ambiente
// FIREBASE_CREDENTIALS (JSON completo do serviceAccountKey).
//
// Em desenvolvimento local, lê o arquivo serviceAccountKey.json.
// IMPORTANTE: nunca suba o serviceAccountKey.json para o GitHub.

const admin = require('firebase-admin');
const path  = require('path');

if (!admin.apps.length) {
  let credential;

  if (process.env.FIREBASE_CREDENTIALS) {
    // Produção: credenciais via variável de ambiente (Render)
    const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
    credential = admin.credential.cert(serviceAccount);
  } else {
    // Desenvolvimento local: lê o arquivo
    const serviceAccount = require(path.join(__dirname, '..', 'serviceAccountKey.json'));
    credential = admin.credential.cert(serviceAccount);
  }

  admin.initializeApp({ credential });
}

const db = admin.firestore();

module.exports = { db };
