// Command para inserir um barbeiro.
// Cria o endereço primeiro (se fornecido) e depois insere o barbeiro.

const ICommand       = require('./ICommand');
const BarbeiroDAO    = require('../dao/BarbeiroDAO');
const EnderecoDAO    = require('../dao/EnderecoDAO');
const BarbeiroFactory = require('../factory/BarbeiroFactory');

class InserirBarbeiroCommand extends ICommand {
  constructor(dados) {
    super();
    this._dados       = dados;
    this._barbeiroDAO = new BarbeiroDAO();
    this._enderecoDAO = new EnderecoDAO();
  }

  async executar() {
    let enderecoId = this._dados.enderecoId || null;

    // Se vier dados de endereço embutidos, cria o endereço primeiro
    if (this._dados.endereco && this._dados.endereco.logradouro) {
      const novoEndereco = await this._enderecoDAO.inserir(this._dados.endereco);
      enderecoId = novoEndereco.id;
    }

    const barbeiro = BarbeiroFactory.criar({ ...this._dados, enderecoId });
    const { id, ...dadosSemId } = barbeiro;
    return this._barbeiroDAO.inserir(dadosSemId);
  }
}

module.exports = InserirBarbeiroCommand;
