// DecoratorSobrancelha — ConcreteDecorator do padrão Decorator.
// Adiciona o serviço de sobrancelha ao agendamento: +R$ 10,00.

const ServicoDecorator = require('./ServicoDecorator');

class DecoratorSobrancelha extends ServicoDecorator {
  getDescricao() {
    return this._servico.getDescricao() + ' + Sobrancelha';
  }

  calcularValor() {
    return this._servico.calcularValor() + 10.00;
  }
}

module.exports = DecoratorSobrancelha;
