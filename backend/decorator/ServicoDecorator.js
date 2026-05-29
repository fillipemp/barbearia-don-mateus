// ServicoDecorator — Decorator abstrato do padrão Decorator (GoF).
//
// Mantém uma referência ao IServico que está sendo decorado.
// Todos os decoradores concretos (DecoratorBarba, etc.) herdam desta classe.
//
// O LSP é respeitado: qualquer ServicoDecorator pode substituir
// um IServico sem quebrar o sistema.

const IServico = require('./IServico');

class ServicoDecorator extends IServico {
  // Recebe o serviço a ser decorado (pode ser CorteBase ou outro Decorator)
  constructor(servico) {
    super();
    this._servico = servico;
  }

  // Delega para o serviço decorado — subclasses sobrescrevem e enriquecem
  getDescricao() {
    return this._servico.getDescricao();
  }

  calcularValor() {
    return this._servico.calcularValor();
  }
}

module.exports = ServicoDecorator;
