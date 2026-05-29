// Ponto de entrada do servidor — Sistema de Gestão de Barbearia.
// Configura o Express, CORS, rotas e inicia o servidor.

require('dotenv').config(); // Carrega .env antes de qualquer outra coisa

const express  = require('express');
const cors     = require('cors');
const path     = require('path');

const agendamentoRoutes = require('./routes/agendamentoRoutes');
const barbeiroRoutes    = require('./routes/barbeiroRoutes');

const app  = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve o frontend como arquivos estáticos
// Acesse http://localhost:3001 para abrir o sistema
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Rotas da API REST
app.use('/agendamentos', agendamentoRoutes);
app.use('/barbeiros',    barbeiroRoutes);

// Qualquer rota não reconhecida serve o index.html (navegação entre páginas)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✂  BarberSystem rodando em http://localhost:${PORT}\n`);
});
