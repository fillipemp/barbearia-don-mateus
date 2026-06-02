// AgendamentoDAO.js
// Operações de banco para agendamentos. Quando busca, já traz o nome do barbeiro junto
// (relacionamento 1:N: um barbeiro tem muitos agendamentos).

const IDao   = require('./IDao');
const { db } = require('../database/database');

const COLECAO = 'agendamentos';

class AgendamentoDAO extends IDao {
  async inserir(agendamento) {
    const docRef = await db.collection(COLECAO).add(agendamento);
    return this.buscarPorId(docRef.id);
  }

  async deletar(id) {
    await db.collection(COLECAO).doc(id).delete();
  }

  async atualizar(agendamento) {
    const { id, ...dados } = agendamento;
    await db.collection(COLECAO).doc(id).update(dados);
    return this.buscarPorId(id);
  }

  async buscarPorId(id) {
    const doc = await db.collection(COLECAO).doc(id).get();
    if (!doc.exists) return null;
    const dados = { id: doc.id, ...doc.data() };
    return this._enriquecerComBarbeiro(dados);
  }

  // Retorna todos os agendamentos ordenados por data e hora
  async buscarTodos() {
    const snapshot = await db.collection(COLECAO)
      .orderBy('data')
      .orderBy('hora')
      .get();
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return Promise.all(lista.map(a => this._enriquecerComBarbeiro(a)));
  }

  // Busca os agendamentos de um barbeiro específico
  async buscarPorBarbeiro(barbeiroId) {
    const snapshot = await db.collection(COLECAO)
      .where('barbeiroId', '==', barbeiroId)
      .orderBy('data')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Traz o nome do barbeiro junto ao agendamento para mostrar na tela
  async _enriquecerComBarbeiro(agendamento) {
    if (!agendamento.barbeiroId) return agendamento;
    const doc = await db.collection('barbeiros').doc(agendamento.barbeiroId).get();
    if (!doc.exists) return agendamento;
    return { ...agendamento, barbeiroNome: doc.data().nome };
  }
}

module.exports = AgendamentoDAO;
