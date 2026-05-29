// database.js — Ponto central de acesso ao banco de dados.
//
// Verifica a variável de ambiente USE_LOCAL:
//   USE_LOCAL=true  → usa db-local.js (JSON, sem internet, ideal para testes)
//   USE_LOCAL=false → usa firebase.js (Firestore em produção)
//
// Os DAOs importam sempre daqui, nunca diretamente do firebase.js.
// Isso aplica o DIP do SOLID: dependem da abstração, não da implementação.

if (process.env.USE_LOCAL === 'true') {
  console.log('[DB] Modo LOCAL ativado — usando data.json');
  module.exports = require('./db-local');
} else {
  console.log('[DB] Modo FIREBASE ativado — conectando ao Firestore');
  module.exports = require('./firebase');
}
