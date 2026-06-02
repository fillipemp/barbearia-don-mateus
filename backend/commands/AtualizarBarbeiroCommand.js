// AtualizarBarbeiroCommand — padrão Command (GoF - Comportamental).
//
// Responsabilidade única (SRP): atualizar os dados de um barbeiro,
// incluindo o endereço vinculado (relacionamento 1:1).
//
// Fluxo:
//   1. Se vier objeto "endereco" no body, atualiza ou cria o Endereço separadamente.
//   2. Monta o objeto Barbeiro atualizado via BarbeiroFactory.
//   3. Persiste no Firestore via BarbeiroDAO.

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

    // Se vier dados de endereço preenchidos, atualiza ou cria o Endereço (rel. 1:1)
    if (this._dados.endereco && this._dados.endereco.logradouro) {
      if (enderecoId) {
        // Barbeiro já tem endereço cadastrado — apenas atualiza
        await this._enderecoDAO.atualizar({ id: enderecoId, ...this._dados.endereco });
      } else {
        // Barbeiro ainda não tinha endereço — cria um novo
        const novoEndereco = await this._enderecoDAO.inserir(this._dados.endereco);
        enderecoId = novoEndereco.id;
      }
    }

    // Monta o objeto Barbeiro com id e todos os campos atualizados
    const barbeiro = BarbeiroFactory.criarComId(this._id, { ...this._dados, enderecoId });
    return this._barbeiroDAO.atualizar(barbeiro);
  }
}

module.exports = AtualizarBarbeiroCommand;
