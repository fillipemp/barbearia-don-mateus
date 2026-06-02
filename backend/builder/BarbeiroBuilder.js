// BarbeiroBuilder.js
// Monta um objeto Barbeiro passo a passo, campo por campo.
// Cada método "com..." define um atributo e retorna o próprio Builder (this),
// o que permite encadear as chamadas em sequência — isso é a interface fluente.
//
// Uso típico (dentro da BarbeiroFactory):
//   new BarbeiroBuilder()
//     .comNome('Carlos')
//     .comCpf('000.000.000-00')
//     .comStatus('ativo')
//     .construir()

const Barbeiro = require('../models/Barbeiro');

class BarbeiroBuilder {
  constructor() {
    this._barbeiro = {};
  }

  comId(id)                       { this._barbeiro.id = id;                       return this; }
  comNome(nome)                   { this._barbeiro.nome = nome;                   return this; }
  comCpf(cpf)                     { this._barbeiro.cpf = cpf;                     return this; }
  comEmail(email)                 { this._barbeiro.email = email;                 return this; }
  comTelefone(telefone)           { this._barbeiro.telefone = telefone;           return this; }
  comEspecialidade(especialidade) { this._barbeiro.especialidade = especialidade; return this; }
  comStatus(status)               { this._barbeiro.status = status;               return this; }
  comDataAdmissao(dataAdmissao)   { this._barbeiro.dataAdmissao = dataAdmissao;   return this; }
  comSalario(salario)             { this._barbeiro.salario = salario;             return this; }
  comHorarioInicio(horarioInicio) { this._barbeiro.horarioInicio = horarioInicio; return this; }
  comHorarioFim(horarioFim)       { this._barbeiro.horarioFim = horarioFim;       return this; }
  comDiasTrabalho(diasTrabalho)   { this._barbeiro.diasTrabalho = diasTrabalho;   return this; }
  comEndereco(enderecoId)         { this._barbeiro.enderecoId = enderecoId;       return this; }

  // Junta tudo e devolve o objeto Barbeiro final
  construir() {
    const b = this._barbeiro;
    return new Barbeiro(
      b.id, b.nome, b.cpf, b.email, b.telefone,
      b.especialidade, b.status || 'ativo', b.dataAdmissao,
      b.salario, b.horarioInicio, b.horarioFim, b.diasTrabalho, b.enderecoId
    );
  }
}

module.exports = BarbeiroBuilder;
