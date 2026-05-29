// Command para deletar um barbeiro pelo id.

const ICommand    = require('./ICommand');
const BarbeiroDAO = require('../dao/BarbeiroDAO');

class DeletarBarbeiroCommand extends ICommand {
  constructor(id) {
    super();
    this._id          = id;
    this._barbeiroDAO = new BarbeiroDAO();
  }

  async executar() {
    return this._barbeiroDAO.deletar(this._id);
  }
}

module.exports = DeletarBarbeiroCommand;
