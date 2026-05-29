// Builder do Agendamento — padrão Builder do GoF (Criacional).
// Constrói objetos Agendamento passo a passo com interface fluente.
// Evita passar muitos parâmetros de uma vez no construtor.

const Agendamento = require('../models/Agendamento');

class AgendamentoBuilder {
  constructor() {
    this._agendamento = {};
  }

  comId(id) {
    this._agendamento.id = id;
    return this;
  }

  comNomeCliente(nomeCliente) {
    this._agendamento.nomeCliente = nomeCliente;
    return this;
  }

  comTelefone(telefone) {
    this._agendamento.telefone = telefone;
    return this;
  }

  comEmail(email) {
    this._agendamento.email = email;
    return this;
  }

  comCpf(cpf) {
    this._agendamento.cpf = cpf;
    return this;
  }

  comData(data) {
    this._agendamento.data = data;
    return this;
  }

  comHora(hora) {
    this._agendamento.hora = hora;
    return this;
  }

  comStatus(status) {
    this._agendamento.status = status;
    return this;
  }

  comValorBase(valorBase) {
    this._agendamento.valorBase = valorBase;
    return this;
  }

  comValorTotal(valorTotal) {
    this._agendamento.valorTotal = valorTotal;
    return this;
  }

  comDescricaoServicos(descricaoServicos) {
    this._agendamento.descricaoServicos = descricaoServicos;
    return this;
  }

  comObservacao(observacao) {
    this._agendamento.observacao = observacao;
    return this;
  }

  comBarbeiro(barbeiroId) {
    this._agendamento.barbeiroId = barbeiroId;
    return this;
  }

  // Monta e retorna o objeto Agendamento final
  construir() {
    const a = this._agendamento;
    return new Agendamento(
      a.id,
      a.nomeCliente,
      a.telefone,
      a.email,
      a.cpf,
      a.data,
      a.hora,
      a.status       || 'agendado',
      a.valorBase    || 30,
      a.valorTotal   || 30,
      a.descricaoServicos || 'Corte de Cabelo',
      a.observacao,
      a.barbeiroId
    );
  }
}

module.exports = AgendamentoBuilder;
