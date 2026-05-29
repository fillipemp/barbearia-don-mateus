// Model do Agendamento — representa um agendamento na barbearia.
// Cada atributo corresponde a um campo no banco de dados Firestore.
// Esse é o "M" do padrão MVC (Model-View-Controller).

class Agendamento {
  constructor(
    id,
    nomeCliente,
    telefone,
    email,
    cpf,
    data,
    hora,
    status,
    valorBase,
    valorTotal,
    descricaoServicos,
    observacao,
    barbeiroId
  ) {
    this.id                = id;
    this.nomeCliente       = nomeCliente;
    this.telefone          = telefone;
    this.email             = email;
    this.cpf               = cpf;
    this.data              = data;
    this.hora              = hora;
    this.status            = status;
    this.valorBase         = valorBase;
    this.valorTotal        = valorTotal;
    this.descricaoServicos = descricaoServicos;
    this.observacao        = observacao;
    this.barbeiroId        = barbeiroId;
  }
}

module.exports = Agendamento;
