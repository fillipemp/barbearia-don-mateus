// AtualizarBarbeiroCommand — padrão Command (GoF - Comportamental).
// Atualiza um barbeiro e, se vier objeto "endereco" no body, atualiza/cria o Endereço (rel. 1:1).

const ICommand        = require('./ICommand');
const BarbeiroDAO     = require('../dao/BarbeiroDAO');
const EnderecoDAO     = require('../dao/EnderecoDAO');
const BarbeiroFactory = require('../factory/BarbeiroFactory');

class AtualizarBarbeiroCommand extends ICommand {
  constructor(id, dados) {
    super();
    this._id          = id;
    this._dados       = dados;
    this._barbeiroDAO = new BarbeiroDAO();
    this._enderecoDAO = new EnderecoDAO();
  }

  async executar() {
    let enderecoId = this._dados.enderecoId || null;

    if (this._dados.endereco && this._dados.endereco.logradouro) {
      if (enderecoId) {
        await this._enderecoDAO.atualizar({ id: enderecoId, ...this._dados.endereco });
      } else {
        const novoEndereco = await this._enderecoDAO.inserir(this._dados.endereco);
        enderecoId = novoEndereco.id;
      }
    }

    const barbeiro = BarbeiroFactory.criarComId(this._id, { ...this._dados, enderecoId });
    return this._barbeiroDAO.atualizar(barbeiro);
  }
}

module.exports = AtualizarBarbeiroCommand;
