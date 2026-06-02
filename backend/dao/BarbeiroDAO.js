// BarbeiroDAO.js
// Responsável por todas as operações de banco relacionadas a barbeiros.
// Implementa IDao, o que garante que qualquer Command possa usar esse DAO
// sem precisar saber que é Firebase por baixo.
//
// Relacionamento 1:1: quando busca um barbeiro, já traz o endereço junto
// (o método _enriquecerComEndereco faz esse "join" manual no Firestore).

const IDao        = require('./IDao');
const EnderecoDAO = require('./EnderecoDAO');
const { db }      = require('../database/database');

const COLECAO = 'barbeiros';

class BarbeiroDAO extends IDao {
  constructor() {
    super();
    this._enderecoDAO = new EnderecoDAO();
  }

  async inserir(barbeiro) {
    const docRef = await db.collection(COLECAO).add(barbeiro);
    return this.buscarPorId(docRef.id);
  }

  async deletar(id) {
    await db.collection(COLECAO).doc(id).delete();
  }

  async atualizar(barbeiro) {
    const { id, ...dados } = barbeiro;
    await db.collection(COLECAO).doc(id).update(dados);
    return this.buscarPorId(id);
  }

  async buscarPorId(id) {
    const doc = await db.collection(COLECAO).doc(id).get();
    if (!doc.exists) return null;
    const dados = { id: doc.id, ...doc.data() };
    return this._enriquecerComEndereco(dados);
  }

  async buscarTodos() {
    const snapshot = await db.collection(COLECAO).orderBy('nome').get();
    const barbeiros = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return Promise.all(barbeiros.map(b => this._enriquecerComEndereco(b)));
  }

  // Busca só os ativos — usado no select de barbeiros no formulário de agendamento
  async buscarAtivos() {
    const snapshot = await db.collection(COLECAO)
      .where('status', '==', 'ativo')
      .orderBy('nome')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Junta os dados do endereço ao objeto do barbeiro (relacionamento 1:1)
  async _enriquecerComEndereco(barbeiro) {
    if (!barbeiro.enderecoId) return barbeiro;
    const endereco = await this._enderecoDAO.buscarPorId(barbeiro.enderecoId);
    return { ...barbeiro, endereco };
  }
}

module.exports = BarbeiroDAO;
