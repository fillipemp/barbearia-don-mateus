// ICommand.js
// A "regra" que todo Command do sistema precisa seguir: ter um método executar().
// Isso permite que as rotas do Express chamem command.executar() sem saber
// qual operação está sendo feita por baixo.
//
// É o mesmo raciocínio do IDao: dependemos da abstração, não da implementação.
// Isso é o DIP do SOLID — e também facilita muito se quiser adicionar
// novos comportamentos sem mexer nas rotas.

class ICommand {
  async executar() {
    throw new Error('executar() não foi implementado neste Command.');
  }
}

module.exports = ICommand;
