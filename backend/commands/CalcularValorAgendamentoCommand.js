// CalcularValorAgendamentoCommand.js
// Esse é o Command que faz a parte mais interessante do sistema:
// calcula o valor total do agendamento usando o padrão Decorator.
//
// Como funciona na prática:
//   1. Começa com um CorteBase (R$ 30,00)
//   2. Para cada extra escolhido (barba, hidratação...), "embrulha" o serviço anterior
//      com um novo Decorator, que soma o próprio preço ao total
//   3. No final, busca descrição e valor do último Decorator (que já carrega tudo acumulado)
//   4. Salva no banco e retorna o resultado
//
// Exemplo com barba e sobrancelha:
//   CorteBase(30) -> DecoratorBarba(+20) -> DecoratorSobrancelha(+10) = R$ 60,00

const ICommand                   = require('./ICommand');
const AgendamentoDAO             = require('../dao/AgendamentoDAO');
const CorteBase                  = require('../decorator/CorteBase');
const DecoratorBarba             = require('../decorator/DecoratorBarba');
const DecoratorHidratacao        = require('../decorator/DecoratorHidratacao');
const DecoratorSobrancelha       = require('../decorator/DecoratorSobrancelha');
const DecoratorTratamentoCapilar = require('../decorator/DecoratorTratamentoCapilar');

// Mapa de nome -> classe do Decorator. Fácil de expandir sem mudar o restante do código.
const DECORADORES = {
  barba:             DecoratorBarba,
  hidratacao:        DecoratorHidratacao,
  sobrancelha:       DecoratorSobrancelha,
  tratamentoCapilar: DecoratorTratamentoCapilar
};

class CalcularValorAgendamentoCommand extends ICommand {
  constructor(id, extras) {
    super();
    this._id             = id;
    this._extras         = extras || [];
    this._agendamentoDAO = new AgendamentoDAO();
  }

  async executar() {
    // Começa do serviço base
    let servico = new CorteBase();

    // Cada extra "embrulha" o serviço anterior — é o Decorator em ação
    for (const extra of this._extras) {
      const Decorator = DECORADORES[extra];
      if (Decorator) {
        servico = new Decorator(servico);
      }
    }

    const descricaoServicos = servico.getDescricao();
    const valorTotal        = servico.calcularValor();
    const valorBase         = new CorteBase().calcularValor();

    // Salva os valores calculados no agendamento existente
    await this._agendamentoDAO.atualizar({
      id: this._id,
      valorBase,
      valorTotal,
      descricaoServicos
    });

    return { descricaoServicos, valorBase, valorTotal, extras: this._extras };
  }
}

module.exports = CalcularValorAgendamentoCommand;
