// DAO do Agendamento — todas as operações no Firestore para agendamentos.
// Implementa IDao, respeitando DIP e LSP do SOLID.
// Cada método tem uma única responsabilidade (SRP).

const IDao    = require('./IDao');
const { db }  = require('../database/database');

const COLECAO = 'agendamentos';

class AgendamentoDAO extends IDao {

  // Insere um novo agendamento e retorna o documento completo
  async inserir(agendamento) {
    const docRef    = await db.collection(COLECAO).add(agendamento);
    return this.buscarPorId(docRef.id);
  }

  // Remove um agendamento pelo id
  async deletar(id) {
    await db.collection(COLECAO).doc(id).delete();
  }

  // Atualiza os dados de um agendamento existente
  async atualizar(agendamento) {
    const { id, ...dados } = agendamento;
    await db.collection(COLECAO).doc(id).update(dados);
    return this.buscarPorId(id);
  }

  // Busca um agendamento pelo id, já com os dados do barbeiro
  async buscarPorId(id) {
    const doc = await db.collection(COLECAO).doc(id).get();

    if (!doc.exists) return null;

    const dados = { id: doc.id, ...doc.data() };
    return this._enriquecerComBarbeiro(dados);
  }

  // Retorna todos os agendamentos com dados do barbeiro, ordenados por data e hora
  async buscarTodos() {
    const snapshot = await db.collection(COLECAO)
      .orderBy('data')
      .orderBy('hora')
      .get();

    const agendamentos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return Promise.all(agendamentos.map(a => this._enriquecerComBarbeiro(a)));
  }

  // Busca agendamentos de um barbeiro específico (usado pelo processo de negócio)
  async buscarPorBarbeiro(barbeiroId) {
    const snapshot = await db.collection(COLECAO)
      .where('barbeiroId', '==', barbeiroId)
      .orderBy('data')
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Enriquece o agendamento com os dados do barbeiro (relacionamento 1:N)
  async _enriquecerComBarbeiro(agendamento) {
    if (!agendamento.barbeiroId) return agendamento;

    const barbeiroDoc = await db.collection('barbeiros').doc(agendamento.barbeiroId).get();

    if (!barbeiroDoc.exists) return agendamento;

    return {
      ...agendamento,
      barbeiroNome: barbeiroDoc.data().nome
    };
  }
}

module.exports = AgendamentoDAO;
