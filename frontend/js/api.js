// api.js — Camada de comunicação com o backend.
// Centraliza a URL base e os métodos de requisição HTTP.
// Troque API_URL pela URL do seu backend no Render após o deploy.

const API_URL = window.API_URL || 'http://localhost:3001';

const api = {
  // ── Agendamentos ──────────────────────────────────────────
  async listarAgendamentos() {
    const res = await fetch(`${API_URL}/agendamentos`);
    return res.json();
  },

  async buscarAgendamento(id) {
    const res = await fetch(`${API_URL}/agendamentos/${id}`);
    return res.json();
  },

  async inserirAgendamento(dados) {
    const res = await fetch(`${API_URL}/agendamentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return res.json();
  },

  async atualizarAgendamento(id, dados) {
    const res = await fetch(`${API_URL}/agendamentos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return res.json();
  },

  async deletarAgendamento(id) {
    await fetch(`${API_URL}/agendamentos/${id}`, { method: 'DELETE' });
  },

  // Processo automatizado — aplica os Decorators no backend
  async calcularValor(id, extras) {
    const res = await fetch(`${API_URL}/agendamentos/${id}/calcular-valor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ extras })
    });
    return res.json();
  },

  // ── Barbeiros ─────────────────────────────────────────────
  async listarBarbeiros() {
    const res = await fetch(`${API_URL}/barbeiros`);
    return res.json();
  },

  async buscarBarbeiro(id) {
    const res = await fetch(`${API_URL}/barbeiros/${id}`);
    return res.json();
  },

  async inserirBarbeiro(dados) {
    const res = await fetch(`${API_URL}/barbeiros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return res.json();
  },

  async atualizarBarbeiro(id, dados) {
    const res = await fetch(`${API_URL}/barbeiros/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return res.json();
  },

  async deletarBarbeiro(id) {
    await fetch(`${API_URL}/barbeiros/${id}`, { method: 'DELETE' });
  }
};
