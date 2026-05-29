// config.js — Detecta automaticamente a URL do backend.
//
// Local:    o frontend é servido pelo próprio backend em localhost:3001,
//           então API_URL fica vazio (mesma origem).
// Produção: o frontend está no Vercel e o backend no Render,
//           então API_URL aponta para a URL do Render.
//
// Quando fizer o deploy, troque a URL abaixo pela URL real do Render.

const RENDER_URL = 'https://barbearia-don-mateus.onrender.com'; // ← trocar após o deploy

window.API_URL = window.location.hostname === 'localhost'
  ? '' // mesma origem — backend serve o frontend localmente
  : RENDER_URL;
