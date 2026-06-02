// InserirBarbeiroCommand.js
// Cadastra um novo barbeiro. Se vier um endereço junto, cria o endereço primeiro
// e depois vincula o ID ao barbeiro (assim funciona o relacionamento 1:1).

const ICommand        = require('./ICommand');
const BarbeiroDAO     = require('../dao/BarbeiroDAO');
const EnderecoDAO     = require('../dao/EnderecoDAO');
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

    // Se vier um endereço no body, salva ele primeiro e pega o ID gerado
    if (this._dados.endereco && this._dados.endereco.logradouro) {
      const novoEndereco = await this._enderecoDAO.inserir(this._dados.endereco);
      enderecoId = novoEndereco.id;
    }

    // Usa a Factory para montar o objeto Barbeiro corretamente
    const barbeiro = BarbeiroFactory.criar({ ...this._dados, enderecoId });
    const { id, ...dadosSemId } = barbeiro;
    return this._barbeiroDAO.inserir(dadosSemId);
  }
}

module.exports = InserirBarbeiroCommand;
