/* ===================================================================
   MÓDULO: interacoes.js
   Responsabilidade única: menu hambúrguer + dropdown do cabeçalho.
   Roda 1 vez só (o cabeçalho nunca é recriado pela SPA).
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const menuToggle = document.getElementById('menu-toggle');
  const menuPrincipal = document.getElementById('menu-principal');

  if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener('click', () => {
      const aberto = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!aberto));
      menuPrincipal.classList.toggle('menu-aberto', !aberto);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuPrincipal.classList.contains('menu-aberto')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuPrincipal.classList.remove('menu-aberto');
        menuToggle.focus();
      }
    });
  }

  const dropdownToggle = document.querySelector('.dropdown-toggle');

  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', () => {
      const aberto = dropdownToggle.getAttribute('aria-expanded') === 'true';
      dropdownToggle.setAttribute('aria-expanded', String(!aberto));
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.tem-dropdown')) {
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Esc fecha o dropdown quando ele foi aberto via teclado (Tab),
    // devolvendo o foco pro botão — padrão esperado em qualquer menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdownToggle.getAttribute('aria-expanded') === 'true') {
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownToggle.focus();
      }
    });
  }

});
