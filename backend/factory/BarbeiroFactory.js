// BarbeiroFactory.js
// Centraliza a criação de objetos Barbeiro usando o Builder internamente.
// As rotas e Commands usam essa Factory — nenhum deles precisa saber
// como o Builder funciona por dentro.

const BarbeiroBuilder = require('../builder/BarbeiroBuilder');

class BarbeiroFactory {
  // Cria um Barbeiro novo a partir dos dados brutos (ex: corpo da requisição)
  static criar(dados) {
    return new BarbeiroBuilder()
      .comNome(dados.nome)
      .comCpf(dados.cpf)
      .comEmail(dados.email)
      .comTelefone(dados.telefone)
      .comEspecialidade(dados.especialidade)
      .comStatus(dados.status)
      .comDataAdmissao(dados.dataAdmissao)
      .comSalario(dados.salario)
      .comHorarioInicio(dados.horarioInicio)
      .comHorarioFim(dados.horarioFim)
      .comDiasTrabalho(dados.diasTrabalho)
      .comEndereco(dados.enderecoId)
      .construir();
  }

  // Cria com ID (usado ao atualizar, onde o ID já existe)
  static criarComId(id, dados) {
    return new BarbeiroBuilder()
      .comId(id)
      .comNome(dados.nome)
      .comCpf(dados.cpf)
      .comEmail(dados.email)
      .comTelefone(dados.telefone)
      .comEspecialidade(dados.especialidade)
      .comStatus(dados.status)
      .comDataAdmissao(dados.dataAdmissao)
      .comSalario(dados.salario)
      .comHorarioInicio(dados.horarioInicio)
      .comHorarioFim(dados.horarioFim)
      .comDiasTrabalho(dados.diasTrabalho)
      .comEndereco(dados.enderecoId)
      .construir();
  }
}

module.exports = BarbeiroFactory;
