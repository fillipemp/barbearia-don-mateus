// DAO do Barbeiro — todas as operações no Firestore para barbeiros.
// Implementa IDao, respeitando DIP e LSP do SOLID.
// Relacionamento: um Barbeiro possui um Endereço (1:1) — feito via JOIN manual.

const IDao        = require('./IDao');
const EnderecoDAO = require('./EnderecoDAO');
const { db }      = require('../database/database');

const COLECAO = 'barbeiros';

class BarbeiroDAO extends IDao {

  constructor() {
    super();
    this._enderecoDAO = new EnderecoDAO();
  }

  // Insere um novo barbeiro e retorna o documento completo com endereço
  async inserir(barbeiro) {
    const docRef = await db.collection(COLECAO).add(barbeiro);
    return this.buscarPorId(docRef.id);
  }

  // Remove um barbeiro pelo id
  async deletar(id) {
    await db.collection(COLECAO).doc(id).delete();
  }

  // Atualiza os dados de um barbeiro existente
  async atualizar(barbeiro) {
    const { id, ...dados } = barbeiro;
    await db.collection(COLECAO).doc(id).update(dados);
    return this.buscarPorId(id);
  }

  // Busca um barbeiro pelo id, já com os dados de endereço (JOIN 1:1)
  async buscarPorId(id) {
    const doc = await db.collection(COLECAO).doc(id).get();

    if (!doc.exists) return null;

    const dados = { id: doc.id, ...doc.data() };
    return this._enriquecerComEndereco(dados);
  }

  // Retorna todos os barbeiros com endereço, ordenados por nome
  async buscarTodos() {
    const snapshot = await db.collection(COLECAO).orderBy('nome').get();
    const barbeiros = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return Promise.all(barbeiros.map(b => this._enriquecerComEndereco(b)));
  }

  // Busca barbeiros ativos para popular o select de agendamentos
  async buscarAtivos() {
    const snapshot = await db.collection(COLECAO)
      .where('status', '==', 'ativo')
      .orderBy('nome')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Enriquece o barbeiro com os dados de endereço (relacionamento 1:1)
  async _enriquecerComEndereco(barbeiro) {
    if (!barbeiro.enderecoId) return barbeiro;

    const endereco = await this._enderecoDAO.buscarPorId(barbeiro.enderecoId);
    return { ...barbeiro, endereco };
  }
}

module.exports = BarbeiroDAO;
