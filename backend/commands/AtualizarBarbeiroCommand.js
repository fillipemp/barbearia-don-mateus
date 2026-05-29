// Command para atualizar os dados de um barbeiro existente.

const ICommand        = require('./ICommand');
const BarbeiroDAO     = require('../dao/BarbeiroDAO');
const BarbeiroFactory = require('../factory/BarbeiroFactory');

class AtualizarBarbeiroCommand extends ICommand {
  constructor(id, dados) {
    super();
    this._id          = id;
    this._dados       = dados;
    this._barbeiroDAO = new BarbeiroDAO();
  }

  async executar() {
    const barbeiro = BarbeiroFactory.criarComId(this._id, this._dados);
    return this._barbeiroDAO.atualizar(barbeiro);
  }
}

module.exports = AtualizarBarbeiroCommand;
