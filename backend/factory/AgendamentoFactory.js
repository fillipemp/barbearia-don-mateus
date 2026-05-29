// Factory do Agendamento — padrão Factory Method do GoF (Criacional).
// Centraliza a criação de objetos Agendamento.
// O restante do código não precisa conhecer como um Agendamento é construído.

const AgendamentoBuilder = require('../builder/AgendamentoBuilder');

class AgendamentoFactory {

  // Cria um Agendamento a partir dos dados brutos (ex: body da requisição)
  static criar(dados) {
    return new AgendamentoBuilder()
      .comNomeCliente(dados.nomeCliente)
      .comTelefone(dados.telefone)
      .comEmail(dados.email)
      .comCpf(dados.cpf)
      .comData(dados.data)
      .comHora(dados.hora)
      .comStatus(dados.status)
      .comValorBase(dados.valorBase)
      .comValorTotal(dados.valorTotal)
      .comDescricaoServicos(dados.descricaoServicos)
      .comObservacao(dados.observacao)
      .comBarbeiro(dados.barbeiroId)
      .construir();
  }

  // Cria um Agendamento com id (usado ao atualizar)
  static criarComId(id, dados) {
    return new AgendamentoBuilder()
      .comId(id)
      .comNomeCliente(dados.nomeCliente)
      .comTelefone(dados.telefone)
      .comEmail(dados.email)
      .comCpf(dados.cpf)
      .comData(dados.data)
      .comHora(dados.hora)
      .comStatus(dados.status)
      .comValorBase(dados.valorBase)
      .comValorTotal(dados.valorTotal)
      .comDescricaoServicos(dados.descricaoServicos)
      .comObservacao(dados.observacao)
      .comBarbeiro(dados.barbeiroId)
      .construir();
  }
}

module.exports = AgendamentoFactory;
