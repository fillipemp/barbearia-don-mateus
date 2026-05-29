// Command para inserir um agendamento.
// Se vier dados de endereço junto ao barbeiro, cria o endereço primeiro.

const ICommand        = require('./ICommand');
const AgendamentoDAO  = require('../dao/AgendamentoDAO');
const AgendamentoFactory = require('../factory/AgendamentoFactory');

class InserirAgendamentoCommand extends ICommand {
  constructor(dados) {
    super();
    this._dados          = dados;
    this._agendamentoDAO = new AgendamentoDAO();
  }

  async executar() {
    const agendamento = AgendamentoFactory.criar(this._dados);
    // Remove o id undefined antes de salvar no Firestore
    const { id, ...dadosSemId } = agendamento;
    return this._agendamentoDAO.inserir(dadosSemId);
  }
}

module.exports = InserirAgendamentoCommand;
