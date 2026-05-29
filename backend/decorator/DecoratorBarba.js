// DecoratorBarba — ConcreteDecorator do padrão Decorator.
// Adiciona o serviço de barba ao agendamento: +R$ 20,00.

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
