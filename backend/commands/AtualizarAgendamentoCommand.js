// Command para atualizar os dados de um agendamento existente.

const ICommand           = require('./ICommand');
const AgendamentoDAO     = require('../dao/AgendamentoDAO');
const AgendamentoFactory = require('../factory/AgendamentoFactory');

class AtualizarAgendamentoCommand extends ICommand {
  constructor(id, dados) {
    super();
    this._id             = id;
    this._dados          = dados;
    this._agendamentoDAO = new AgendamentoDAO();
  }

  async executar() {
    const agendamento = AgendamentoFactory.criarComId(this._id, this._dados);
    return this._agendamentoDAO.atualizar(agendamento);
  }
}

module.exports = AtualizarAgendamentoCommand;
