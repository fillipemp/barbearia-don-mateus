// Interface IDao — contrato que todos os DAOs devem seguir.
// Aplica o princípio DIP (Dependency Inversion Principle) do SOLID:
// os módulos de alto nível (Commands) dependem desta abstração,
// não das implementações concretas (AgendamentoDAO, BarbeiroDAO, etc).
//
// Também garante o LSP (Liskov Substitution Principle):
// qualquer DAO concreto pode substituir IDao sem quebrar o sistema.

class IDao {
  async inserir(_dados) {
    throw new Error('O método inserir() deve ser implementado pelo DAO concreto.');
  }

  async deletar(_id) {
    throw new Error('O método deletar() deve ser implementado pelo DAO concreto.');
  }

  async atualizar(_dados) {
    throw new Error('O método atualizar() deve ser implementado pelo DAO concreto.');
  }

  async buscarPorId(_id) {
    throw new Error('O método buscarPorId() deve ser implementado pelo DAO concreto.');
  }

  async buscarTodos() {
    throw new Error('O método buscarTodos() deve ser implementado pelo DAO concreto.');
  }
}

module.exports = IDao;
