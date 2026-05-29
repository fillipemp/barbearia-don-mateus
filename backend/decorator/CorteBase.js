// CorteBase — ConcreteComponent do padrão Decorator.
//
// É o serviço base de qualquer agendamento: o corte de cabelo.
// Os decoradores serão "enrolados" em volta deste objeto,
// adicionando extras sem modificar esta classe (OCP do SOLID).

const IServico = require('./IServico');

class CorteBase extends IServico {
  getDescricao() {
    return 'Corte de Cabelo';
  }

  calcularValor() {
    return 30.00;
  }
}

module.exports = CorteBase;
