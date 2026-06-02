// utils.js — Funções utilitárias reutilizáveis em todas as páginas.

// ── Menu hambúrguer (mobile) ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const toggle  = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!toggle) return;

  function openMenu()  { sidebar.classList.add('open'); overlay.classList.add('open'); }
  function closeMenu() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

  toggle.addEventListener('click', () => sidebar.classList.contains('open') ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);

  // Fechar ao clicar em qualquer link da nav (navega para outra página)
  sidebar.querySelectorAll('.nav-item').forEach(a => a.addEventListener('click', closeMenu));
});

// Exibe um toast de notificação temporário
function toast(mensagem, tipo = 'sucesso') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast toast-${tipo}`;
  el.textContent = mensagem;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// Formata uma data ISO para DD/MM/AAAA
function formatarData(dataStr) {
  if (!dataStr) return '—';
  const [ano, mes, dia] = dataStr.split('-');
  return `${dia}/${mes}/${ano}`;
}

// Formata um valor para moeda BRL
function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

// Retorna o HTML do badge de status de agendamento
function badgeStatus(status) {
  const mapa = {
    agendado:   'badge-agendado',
    confirmado: 'badge-confirmado',
    concluido:  'badge-concluido',
    cancelado:  'badge-cancelado',
    ativo:      'badge-ativo',
    inativo:    'badge-inativo'
  };
  const cls   = mapa[status] || 'badge-agendado';
  const label = status ? status.charAt(0).toUpperCase() + status.slice(1) : '—';
  return `<span class="badge ${cls}">${label}</span>`;
}

// Abre um modal pelo id
function abrirModal(id) {
  document.getElementById(id).classList.add('open');
}

// Fecha um modal pelo id
function fecharModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Fecha modal ao clicar no overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ── Máscaras de input ──────────────────────────────────────

// Máscara CPF: 000.000.000-00
function mascaraCPF(el) {
  el.addEventListener('input', () => {
    let v = el.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 9)      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    el.value = v;
  });
}

// Máscara Telefone: (11) 99999-9999 ou (11) 9999-9999
function mascaraTelefone(el) {
  el.addEventListener('input', () => {
    let v = el.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10)     v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    else if (v.length > 0) v = v.replace(/(\d{0,2})/, '($1');
    el.value = v;
  });
}

// Validação de e-mail
function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

// Aplica todas as máscaras de um formulário por id de campo
function aplicarMascaras({ cpf, telefone } = {}) {
  if (cpf) {
    const el = document.getElementById(cpf);
    if (el) mascaraCPF(el);
  }
  if (telefone) {
    const el = document.getElementById(telefone);
    if (el) mascaraTelefone(el);
  }
}
