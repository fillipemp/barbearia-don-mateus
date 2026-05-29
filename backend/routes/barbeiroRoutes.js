// Rotas de Barbeiro — "C" do padrão MVC (Controller).
//
// Endpoints REST:
//   GET    /barbeiros       → consultar todos
//   GET    /barbeiros/:id   → consultar por id
//   POST   /barbeiros       → inserir
//   PUT    /barbeiros/:id   → atualizar
//   DELETE /barbeiros/:id   → deletar

const express = require('express');
const router  = express.Router();

const ConsultarTodosBarbeirosCommand = require('../commands/ConsultarTodosBarbeirosCommand');
const ConsultarBarbeiroPorIdCommand  = require('../commands/ConsultarBarbeiroPorIdCommand');
const InserirBarbeiroCommand         = require('../commands/InserirBarbeiroCommand');
const AtualizarBarbeiroCommand       = require('../commands/AtualizarBarbeiroCommand');
const DeletarBarbeiroCommand         = require('../commands/DeletarBarbeiroCommand');

// GET /barbeiros
router.get('/', async (req, res) => {
  try {
    const resultado = await new ConsultarTodosBarbeirosCommand().executar();
    res.json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// GET /barbeiros/:id
router.get('/:id', async (req, res) => {
  try {
    const resultado = await new ConsultarBarbeiroPorIdCommand(req.params.id).executar();
    if (!resultado) return res.status(404).json({ erro: 'Barbeiro não encontrado.' });
    res.json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// POST /barbeiros
// Body pode incluir objeto "endereco" para criação automática (relacionamento 1:1)
router.post('/', async (req, res) => {
  try {
    const resultado = await new InserirBarbeiroCommand(req.body).executar();
    res.status(201).json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// PUT /barbeiros/:id
router.put('/:id', async (req, res) => {
  try {
    const resultado = await new AtualizarBarbeiroCommand(req.params.id, req.body).executar();
    res.json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// DELETE /barbeiros/:id
router.delete('/:id', async (req, res) => {
  try {
    await new DeletarBarbeiroCommand(req.params.id).executar();
    res.status(204).send();
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

module.exports = router;
