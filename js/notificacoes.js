/* ===================================================================
   MÓDULO: notificacoes.js
   Responsabilidade única: mostrar e esconder o toast. Fica na "casca"
   da SPA (nunca é destruído), então liga o botão de fechar 1 vez só.
   =================================================================== */

function mostrarToast(texto) {
  const toast = document.getElementById('toast');
  const toastTexto = document.getElementById('toast-texto');
  if (!toast) return;

  toastTexto.textContent = texto;
  toast.classList.add('toast-visivel');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('toast-visivel'), 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  const toastFechar = document.getElementById('toast-fechar');
  const toast = document.getElementById('toast');
  if (toastFechar) {
    toastFechar.addEventListener('click', () => toast.classList.remove('toast-visivel'));
  }
});
