// ICommand — interface base para todos os Commands (GoF - Comportamental).
//
// Aplica o DIP do SOLID: os controllers (alto nível) dependem desta
// abstração, não dos commands concretos (baixo nível).
// Cada Command encapsula uma única operação de negócio (SRP).

class ICommand {
  async executar() {
    throw new Error('executar() deve ser implementado pelo Command concreto.');
  }
}

module.exports = ICommand;
