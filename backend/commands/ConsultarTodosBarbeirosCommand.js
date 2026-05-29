// Command para consultar todos os barbeiros cadastrados.

const ICommand    = require('./ICommand');
const BarbeiroDAO = require('../dao/BarbeiroDAO');

class ConsultarTodosBarbeirosCommand extends ICommand {
  constructor() {
    super();
    this._barbeiroDAO = new BarbeiroDAO();
  }

  async executar() {
    return this._barbeiroDAO.buscarTodos();
  }
}

module.exports = ConsultarTodosBarbeirosCommand;
