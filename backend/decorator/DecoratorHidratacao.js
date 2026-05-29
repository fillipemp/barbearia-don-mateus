// DecoratorHidratacao — ConcreteDecorator do padrão Decorator.
// Adiciona o serviço de hidratação capilar ao agendamento: +R$ 25,00.

const ServicoDecorator = require('./ServicoDecorator');

class DecoratorHidratacao extends ServicoDecorator {
  getDescricao() {
    return this._servico.getDescricao() + ' + Hidratação';
  }

  calcularValor() {
    return this._servico.calcularValor() + 25.00;
  }
}

module.exports = DecoratorHidratacao;
