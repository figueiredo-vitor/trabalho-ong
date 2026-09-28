/* ===================================================================
   MÓDULO: modal.js
   Responsabilidade única: abrir/fechar o modal de termos de uso.
   A caixa do modal fica na casca (fixa); o BOTÃO que abre fica dentro
   do formulário, que é recriado a cada navegação — por isso o "abrir"
   é religado à parte (initModalTermos), enquanto fechar/aceitar/Esc
   ficam fixos desde o início.
   =================================================================== */

function initModalTermos() {
  const abrirTermos = document.getElementById('abrir-termos');
  const modalTermos = document.getElementById('modal-termos');
  if (!abrirTermos || !modalTermos) return;

  abrirTermos.addEventListener('click', () => {
    modalTermos.hidden = false;
    document.getElementById('fechar-termos').focus();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const modalTermos = document.getElementById('modal-termos');
  const fecharTermos = document.getElementById('fechar-termos');
  const aceitarTermos = document.getElementById('aceitar-termos');
  if (!modalTermos) return;

  function fecharModal() {
    modalTermos.hidden = true;
    const abrirTermos = document.getElementById('abrir-termos');
    if (abrirTermos) abrirTermos.focus();
  }

  fecharTermos.addEventListener('click', fecharModal);
  aceitarTermos.addEventListener('click', () => {
    const termos = document.getElementById('termos');
    if (termos) termos.checked = true;
    fecharModal();
  });
  modalTermos.addEventListener('click', (e) => { if (e.target === modalTermos) fecharModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modalTermos.hidden) fecharModal(); });
});
