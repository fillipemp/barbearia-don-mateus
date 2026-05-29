// Command para consultar um barbeiro pelo id.

const ICommand    = require('./ICommand');
const BarbeiroDAO = require('../dao/BarbeiroDAO');

class ConsultarBarbeiroPorIdCommand extends ICommand {
  constructor(id) {
    super();
    this._id          = id;
    this._barbeiroDAO = new BarbeiroDAO();
  }

  async executar() {
    return this._barbeiroDAO.buscarPorId(this._id);
  }
}

module.exports = ConsultarBarbeiroPorIdCommand;
