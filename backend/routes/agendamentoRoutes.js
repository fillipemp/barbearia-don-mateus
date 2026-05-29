// Rotas de Agendamento — "C" do padrão MVC (Controller).
// Cada rota instancia o Command adequado e chama executar().
// O controller não sabe COMO a operação é feita — só delega ao Command.
//
// Endpoints REST:
//   GET    /agendamentos          → consultar todos
//   GET    /agendamentos/:id      → consultar por id
//   POST   /agendamentos          → inserir
//   PUT    /agendamentos/:id      → atualizar
//   DELETE /agendamentos/:id      → deletar
//   POST   /agendamentos/:id/calcular-valor → processo automatizado (Decorator)

const express = require('express');
const router  = express.Router();

const ConsultarTodosAgendamentosCommand  = require('../commands/ConsultarTodosAgendamentosCommand');
const ConsultarAgendamentoPorIdCommand   = require('../commands/ConsultarAgendamentoPorIdCommand');
const InserirAgendamentoCommand          = require('../commands/InserirAgendamentoCommand');
const AtualizarAgendamentoCommand        = require('../commands/AtualizarAgendamentoCommand');
const DeletarAgendamentoCommand          = require('../commands/DeletarAgendamentoCommand');
const CalcularValorAgendamentoCommand    = require('../commands/CalcularValorAgendamentoCommand');

// GET /agendamentos
router.get('/', async (req, res) => {
  try {
    const resultado = await new ConsultarTodosAgendamentosCommand().executar();
    res.json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// GET /agendamentos/:id
router.get('/:id', async (req, res) => {
  try {
    const resultado = await new ConsultarAgendamentoPorIdCommand(req.params.id).executar();
    if (!resultado) return res.status(404).json({ erro: 'Agendamento não encontrado.' });
    res.json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// POST /agendamentos
router.post('/', async (req, res) => {
  try {
    const resultado = await new InserirAgendamentoCommand(req.body).executar();
    res.status(201).json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// PUT /agendamentos/:id
router.put('/:id', async (req, res) => {
  try {
    const resultado = await new AtualizarAgendamentoCommand(req.params.id, req.body).executar();
    res.json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// DELETE /agendamentos/:id
router.delete('/:id', async (req, res) => {
  try {
    await new DeletarAgendamentoCommand(req.params.id).executar();
    res.status(204).send();
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// POST /agendamentos/:id/calcular-valor  — processo automatizado com Decorator
// Body: { extras: ['barba', 'hidratacao', 'sobrancelha', 'tratamentoCapilar'] }
router.post('/:id/calcular-valor', async (req, res) => {
  try {
    const { extras } = req.body;
    const resultado = await new CalcularValorAgendamentoCommand(req.params.id, extras).executar();
    res.json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

module.exports = router;
