// Command para deletar um agendamento pelo id.

const ICommand       = require('./ICommand');
const AgendamentoDAO = require('../dao/AgendamentoDAO');

class DeletarAgendamentoCommand extends ICommand {
  constructor(id) {
    super();
    this._id             = id;
    this._agendamentoDAO = new AgendamentoDAO();
  }

  async executar() {
    return this._agendamentoDAO.deletar(this._id);
  }
}

module.exports = DeletarAgendamentoCommand;
