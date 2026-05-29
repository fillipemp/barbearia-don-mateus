// Model do Barbeiro — representa um barbeiro cadastrado no sistema.
// Relacionamento: um Barbeiro possui muitos Agendamentos (1:N).
//                 um Barbeiro possui um Endereco (1:1).

class Barbeiro {
  constructor(
    id,
    nome,
    cpf,
    email,
    telefone,
    especialidade,
    status,
    dataAdmissao,
    salario,
    horarioInicio,
    horarioFim,
    enderecoId
  ) {
    this.id            = id;
    this.nome          = nome;
    this.cpf           = cpf;
    this.email         = email;
    this.telefone      = telefone;
    this.especialidade = especialidade;
    this.status        = status;
    this.dataAdmissao  = dataAdmissao;
    this.salario       = salario;
    this.horarioInicio = horarioInicio;
    this.horarioFim    = horarioFim;
    this.enderecoId    = enderecoId;
  }
}

module.exports = Barbeiro;
