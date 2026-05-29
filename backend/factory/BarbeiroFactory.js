// Factory do Barbeiro — padrão Factory Method do GoF (Criacional).
// Centraliza a criação de objetos Barbeiro usando o BarbeiroBuilder internamente.

const BarbeiroBuilder = require('../builder/BarbeiroBuilder');

class BarbeiroFactory {

  // Cria um Barbeiro a partir dos dados brutos (ex: body da requisição)
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
      .comEndereco(dados.enderecoId)
      .construir();
  }

  // Cria um Barbeiro com id (usado ao atualizar)
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
      .comEndereco(dados.enderecoId)
      .construir();
  }
}

module.exports = BarbeiroFactory;
