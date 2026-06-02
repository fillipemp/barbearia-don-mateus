// DecoratorTratamentoCapilar.js — adiciona tratamento capilar premium: +R$ 35,00

const ServicoDecorator = require('./ServicoDecorator');

class DecoratorTratamentoCapilar extends ServicoDecorator {
  getDescricao() {
    return this._servico.getDescricao() + ' + Tratamento Capilar';
  }

  calcularValor() {
    return this._servico.calcularValor() + 35.00;
  }
}

module.exports = DecoratorTratamentoCapilar;
