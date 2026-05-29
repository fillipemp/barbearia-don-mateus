// Model do Endereço — representa o endereço de um barbeiro.
// Relacionamento: Barbeiro possui um Endereço (1:1).

class Endereco {
  constructor(id, logradouro, numero, bairro, cidade, estado, cep) {
    this.id         = id;
    this.logradouro = logradouro;
    this.numero     = numero;
    this.bairro     = bairro;
    this.cidade     = cidade;
    this.estado     = estado;
    this.cep        = cep;
  }
}

module.exports = Endereco;
