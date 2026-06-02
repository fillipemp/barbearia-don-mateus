// DecoratorBarba.js
// Adiciona o serviço de barba ao agendamento: mais R$ 20,00 e " + Barba" na descrição.
// Herda de ServicoDecorator, então tem acesso ao serviço que está embrulhando.

const ServicoDecorator = require('./ServicoDecorator');

class DecoratorBarba extends ServicoDecorator {
  getDescricao() {
    return this._servico.getDescricao() + ' + Barba';
  }

  calcularValor() {
    return this._servico.calcularValor() + 20.00;
  }
}

module.exports = DecoratorBarba;
