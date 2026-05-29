// Command para consultar todos os agendamentos cadastrados.

const ICommand       = require('./ICommand');
const AgendamentoDAO = require('../dao/AgendamentoDAO');

class ConsultarTodosAgendamentosCommand extends ICommand {
  constructor() {
    super();
    this._agendamentoDAO = new AgendamentoDAO();
  }

  async executar() {
    return this._agendamentoDAO.buscarTodos();
  }
}

module.exports = ConsultarTodosAgendamentosCommand;
