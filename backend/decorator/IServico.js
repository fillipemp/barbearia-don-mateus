// IServico.js
// Essa é a "interface" que define o contrato de qualquer serviço da barbearia.
// Todo serviço precisa saber duas coisas: o que ele é (getDescricao) e quanto custa (calcularValor).
//
// Por que isso importa? O Decorator funciona justamente porque ele não precisa saber
// se está "em volta" de um CorteBase ou de outro Decorator — qualquer coisa que
// implemente esses dois métodos serve. É assim que o encadeamento funciona.
//
// No contexto do SOLID: isso é o DIP na prática. O CalcularValorAgendamentoCommand
// usa IServico, não uma classe concreta. Então amanhã, se criar um novo serviço,
// não precisa mudar nada no Command.

class IServico {
  getDescricao() {
    throw new Error('Precisa implementar getDescricao().');
  }

  calcularValor() {
    throw new Error('Precisa implementar calcularValor().');
  }
}

module.exports = IServico;
