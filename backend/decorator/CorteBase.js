// CorteBase.js
// O serviço básico de qualquer atendimento na barbearia: o corte de cabelo.
// Todo agendamento começa aqui, com R$ 30,00.
//
// No padrão Decorator, essa é a classe "base" — o ponto de partida.
// Os decoradores (Barba, Sobrancelha...) vão sendo colocados em volta dela,
// cada um adicionando seu preço e sua descrição ao total.

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
