// IDao.js
// Define os métodos que todo DAO do sistema precisa ter.
// É basicamente um "contrato": qualquer DAO que não implementar esses métodos
// vai lançar um erro explicando o que falta.
//
// Por que fazer isso em vez de só escrever os métodos direto em cada DAO?
// Porque assim os Commands não precisam saber qual DAO estão usando.
// Se um dia trocar o Firebase por MongoDB, só muda o DAO — o Command não sabe
// nem que isso aconteceu. Isso é o DIP (D do SOLID).

class IDao {
  async inserir(_dados) {
    throw new Error('inserir() não foi implementado neste DAO.');
  }

  async deletar(_id) {
    throw new Error('deletar() não foi implementado neste DAO.');
  }

  async atualizar(_dados) {
    throw new Error('atualizar() não foi implementado neste DAO.');
  }

  async buscarPorId(_id) {
    throw new Error('buscarPorId() não foi implementado neste DAO.');
  }

  async buscarTodos() {
    throw new Error('buscarTodos() não foi implementado neste DAO.');
  }
}

module.exports = IDao;
