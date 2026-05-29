// Command para consultar um agendamento pelo id.

const ICommand       = require('./ICommand');
const AgendamentoDAO = require('../dao/AgendamentoDAO');

class ConsultarAgendamentoPorIdCommand extends ICommand {
  constructor(id) {
    super();
    this._id             = id;
    this._agendamentoDAO = new AgendamentoDAO();
  }

  async executar() {
    return this._agendamentoDAO.buscarPorId(this._id);
  }
}

module.exports = ConsultarAgendamentoPorIdCommand;
