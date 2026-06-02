// ServicoDecorator.js
// Essa é a classe "meio" do Decorator — todos os extras (Barba, Sobrancelha...) herdam dela.
// Ela guarda uma referência ao serviço que está "decorando" (pode ser o CorteBase
// ou outro Decorator que já foi aplicado antes).
//
// O truque é simples: quando o Decorator calcula o valor, ele soma o próprio preço
// ao valor do serviço que está dentro dele. Isso cria o encadeamento.
// Ex: DecoratorBarba.calcularValor() => corteBase.calcularValor() + 20

const IServico = require('./IServico');

class ServicoDecorator extends IServico {
  constructor(servico) {
    super();
    this._servico = servico; // o serviço que esse decorator está "embrulhando"
  }

  getDescricao() {
    return this._servico.getDescricao();
  }

  calcularValor() {
    return this._servico.calcularValor();
  }
}

module.exports = ServicoDecorator;
