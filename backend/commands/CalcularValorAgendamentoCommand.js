// Command do processo automatizado: Calcular Valor do Agendamento.
//
// Aplica o padrão Decorator para compor o valor total do agendamento
// com base nos serviços extras escolhidos pelo cliente.
//
// Exemplo de uso (encadeamento de Decorators):
//   CorteBase (R$ 30)
//   → DecoratorBarba       (+R$ 20) = R$ 50
//   → DecoratorSobrancelha (+R$ 10) = R$ 60
//   → DecoratorHidratacao  (+R$ 25) = R$ 85
//
// Cada novo serviço é "enrolado" em volta do anterior sem modificar
// nenhuma classe existente — isso é o Open-Closed Principle (OCP).

const ICommand                  = require('./ICommand');
const AgendamentoDAO            = require('../dao/AgendamentoDAO');
const CorteBase                 = require('../decorator/CorteBase');
const DecoratorBarba            = require('../decorator/DecoratorBarba');
const DecoratorHidratacao       = require('../decorator/DecoratorHidratacao');
const DecoratorSobrancelha      = require('../decorator/DecoratorSobrancelha');
const DecoratorTratamentoCapilar = require('../decorator/DecoratorTratamentoCapilar');

// Mapa de chave → Decorator concreto (facilita a extensão futura)
const DECORADORES = {
  barba:             DecoratorBarba,
  hidratacao:        DecoratorHidratacao,
  sobrancelha:       DecoratorSobrancelha,
  tratamentoCapilar: DecoratorTratamentoCapilar
};

class CalcularValorAgendamentoCommand extends ICommand {
  // id: agendamento a atualizar | extras: array de strings com os serviços extras
  // Exemplo de extras: ['barba', 'hidratacao']
  constructor(id, extras) {
    super();
    this._id             = id;
    this._extras         = extras || [];
    this._agendamentoDAO = new AgendamentoDAO();
  }

  async executar() {
    // 1. Parte do serviço base (CorteBase = ConcreteComponent)
    let servico = new CorteBase();

    // 2. Aplica cada Decorator escolhido, encadeando os serviços extras
    for (const extra of this._extras) {
      const Decorator = DECORADORES[extra];
      if (Decorator) {
        servico = new Decorator(servico);
      }
    }

    // 3. Extrai a descrição e o valor calculados pelo Decorator
    const descricaoServicos = servico.getDescricao();
    const valorTotal        = servico.calcularValor();
    const valorBase         = new CorteBase().calcularValor();

    // 4. Atualiza o agendamento no banco com os novos valores
    await this._agendamentoDAO.atualizar({
      id: this._id,
      valorBase,
      valorTotal,
      descricaoServicos
    });

    // 5. Retorna o resumo do cálculo para exibição no frontend
    return {
      descricaoServicos,
      valorBase,
      valorTotal,
      extras: this._extras
    };
  }
}

module.exports = CalcularValorAgendamentoCommand;
