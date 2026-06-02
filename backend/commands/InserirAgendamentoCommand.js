// InserirAgendamentoCommand.js — cria um novo agendamento no banco.

const ICommand           = require('./ICommand');
const AgendamentoDAO     = require('../dao/AgendamentoDAO');
const AgendamentoFactory = require('../factory/AgendamentoFactory');

class InserirAgendamentoCommand extends ICommand {
  constructor(dados) {
    super();
    this._dados          = dados;
    this._agendamentoDAO = new AgendamentoDAO();
  }

  async executar() {
    const agendamento = AgendamentoFactory.criar(this._dados);
    const { id, ...dadosSemId } = agendamento;
    return this._agendamentoDAO.inserir(dadosSemId);
  }
}

module.exports = InserirAgendamentoCommand;
