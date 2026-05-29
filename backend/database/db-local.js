// db-local.js — Banco de dados local para desenvolvimento.
//
// Emula exatamente a mesma API do Firebase Firestore, mas salva os dados
// em um arquivo data.json na raiz do backend.
// Os DAOs não precisam saber qual banco está sendo usado — apenas usam
// db.collection().add(), .doc().get(), etc. normalmente.
//
// Para alternar entre local e Firebase, use a variável USE_LOCAL no .env:
//   USE_LOCAL=true  → usa este arquivo (sem precisar do Firebase)
//   USE_LOCAL=false → usa Firebase Firestore (produção)

const fs   = require('fs');
const path = require('path');

const ARQUIVO_DADOS = path.join(__dirname, '..', 'data.json');

// Lê o arquivo JSON ou retorna objeto vazio se não existir
function lerDados() {
  if (!fs.existsSync(ARQUIVO_DADOS)) return {};
  return JSON.parse(fs.readFileSync(ARQUIVO_DADOS, 'utf-8'));
}

// Persiste os dados no arquivo JSON
function salvarDados(dados) {
  fs.writeFileSync(ARQUIVO_DADOS, JSON.stringify(dados, null, 2));
}

// Gera um id único (imita o formato do Firestore)
function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Emula db.collection('nome')
function collection(nomeColecao) {
  return {

    // db.collection().add(dados) → insere e retorna { id }
    async add(dados) {
      const banco = lerDados();
      banco[nomeColecao] = banco[nomeColecao] || {};
      const id = gerarId();
      banco[nomeColecao][id] = { ...dados };
      salvarDados(banco);
      return { id };
    },

    // db.collection().doc(id) → operações em um documento específico
    doc(id) {
      return {
        async get() {
          const banco = lerDados();
          const col   = banco[nomeColecao] || {};
          const dado  = col[id];
          return {
            exists: !!dado,
            id,
            data: () => dado
          };
        },
        async update(novos) {
          const banco = lerDados();
          banco[nomeColecao] = banco[nomeColecao] || {};
          banco[nomeColecao][id] = {
            ...(banco[nomeColecao][id] || {}),
            ...novos
          };
          salvarDados(banco);
        },
        async delete() {
          const banco = lerDados();
          if (banco[nomeColecao]) delete banco[nomeColecao][id];
          salvarDados(banco);
        }
      };
    },

    // db.collection().get() → retorna todos os documentos
    async get() {
      const banco = lerDados();
      const col   = banco[nomeColecao] || {};
      const docs  = Object.entries(col).map(([id, dado]) => ({
        id,
        data: () => dado
      }));
      return { docs };
    },

    // db.collection().orderBy(campo) → ordena pelo campo
    orderBy(campo) {
      const self = this;
      const resultado = {
        async get() {
          const banco = lerDados();
          const col   = banco[nomeColecao] || {};
          const docs  = Object.entries(col)
            .sort(([, a], [, b]) => {
              if ((a[campo] || '') < (b[campo] || '')) return -1;
              if ((a[campo] || '') > (b[campo] || '')) return  1;
              return 0;
            })
            .map(([id, dado]) => ({ id, data: () => dado }));
          return { docs };
        },
        // Suporte a segundo orderBy encadeado (ex: .orderBy('data').orderBy('hora'))
        orderBy(campo2) {
          return {
            async get() {
              const banco = lerDados();
              const col   = banco[nomeColecao] || {};
              const docs  = Object.entries(col)
                .sort(([, a], [, b]) => {
                  const cmp1 = (a[campo] || '').localeCompare(b[campo] || '');
                  if (cmp1 !== 0) return cmp1;
                  return (a[campo2] || '').localeCompare(b[campo2] || '');
                })
                .map(([id, dado]) => ({ id, data: () => dado }));
              return { docs };
            }
          };
        }
      };
      return resultado;
    },

    // db.collection().where(campo, op, valor) → filtra documentos
    where(campo, operador, valor) {
      return {
        async get() {
          const banco = lerDados();
          const col   = banco[nomeColecao] || {};
          const docs  = Object.entries(col)
            .filter(([, dado]) => {
              if (operador === '==') return dado[campo] === valor;
              if (operador === '!=') return dado[campo] !== valor;
              if (operador === '>' ) return dado[campo] >   valor;
              if (operador === '<' ) return dado[campo] <   valor;
              return true;
            })
            .map(([id, dado]) => ({ id, data: () => dado }));
          return { docs };
        },
        orderBy() { return this; }
      };
    }
  };
}

module.exports = { db: { collection } };
