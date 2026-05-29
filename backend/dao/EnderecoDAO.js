// DAO do Endereço — operações no Firestore para endereços.
// Relacionamento: Barbeiro possui um único Endereço (1:1).

const IDao   = require('./IDao');
const { db } = require('../database/database');

const COLECAO = 'enderecos';

class EnderecoDAO extends IDao {

  async inserir(endereco) {
    const docRef = await db.collection(COLECAO).add(endereco);
    return this.buscarPorId(docRef.id);
  }

  async deletar(id) {
    await db.collection(COLECAO).doc(id).delete();
  }

  async atualizar(endereco) {
    const { id, ...dados } = endereco;
    await db.collection(COLECAO).doc(id).update(dados);
    return this.buscarPorId(id);
  }

  async buscarPorId(id) {
    const doc = await db.collection(COLECAO).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async buscarTodos() {
    const snapshot = await db.collection(COLECAO).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = EnderecoDAO;
