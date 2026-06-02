// Barbeiro.js — representa um barbeiro cadastrado no sistema.
// Relacionamentos: tem um Endereço (1:1) e muitos Agendamentos (1:N).

class Barbeiro {
  constructor(
    id, nome, cpf, email, telefone,
    especialidade, status, dataAdmissao,
    salario, horarioInicio, horarioFim, diasTrabalho, enderecoId
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
    this.diasTrabalho  = diasTrabalho;
    this.enderecoId    = enderecoId; // chave do Endereço (relacionamento 1:1)
  }
}

module.exports = Barbeiro;
