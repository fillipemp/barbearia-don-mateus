// IServico — Component do padrão Decorator (GoF - Estrutural).
//
// Define o contrato (interface) que todos os serviços e decoradores
// devem seguir. Isso garante o DIP do SOLID: o código de alto nível
// depende dessa abstração, não de implementações concretas.
//
// Estrutura do Decorator (conforme visto em aula):
//   IServico          ← Component (esta interface)
//   CorteBase         ← ConcreteComponent
//   ServicoDecorator  ← Decorator abstrato
//   DecoratorBarba,   ← ConcreteDecorators
//   DecoratorHidratacao, etc.

class IServico {
  // Retorna a descrição completa do serviço (com todos os extras aplicados)
  getDescricao() {
    throw new Error('getDescricao() deve ser implementado.');
  }

  // Retorna o valor total do serviço (com todos os extras aplicados)
  calcularValor() {
    throw new Error('calcularValor() deve ser implementado.');
  }
}

module.exports = IServico;
