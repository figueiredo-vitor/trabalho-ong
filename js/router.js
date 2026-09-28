/* ===================================================================
   ONG Mãos Amigas — ROTEADOR DA SPA
   =================================================================== */

const comoAjudarData = [
  {
    id: 'voluntariado', imagem: 'img/voluntariado.jpg', alt: 'Ícone representando voluntariado',
    titulo: 'Seja Voluntário', badge: 'Voluntariado', badgeClasse: 'badge-voluntariado',
    texto: 'Você pode doar seu tempo participando das nossas ações mensais. Não é necessária experiência prévia, apenas vontade de ajudar.',
    linkTexto: 'Quero ser voluntário →'
  },
  {
    id: 'doacao', imagem: 'img/doacao.jpg', alt: 'Ícone representando doação',
    titulo: 'Faça uma Doação', badge: 'Doação', badgeClasse: 'badge-doacao',
    texto: 'Aceitamos doações de alimentos, roupas e também doações em dinheiro, que são revertidas diretamente para os projetos em andamento.',
    linkTexto: 'Quero doar →'
  }
];

const projetosData = [
  {
    imagem: 'img/projeto-comunidade.jpg', alt: 'Ilustração do projeto realizado na comunidade',
    titulo: 'Projeto Comunidade', badge: 'Ação Social', badgeClasse: 'badge-comunidade',
    texto: 'Ação social realizada em bairros de baixa renda, com distribuição de alimentos e roupas arrecadadas em campanhas de doação.'
  },
  {
    imagem: 'img/equipe-voluntarios.jpg', alt: 'Ilustração da equipe de voluntários da ONG',
    titulo: 'Equipe de Voluntários', badge: 'Voluntariado', badgeClasse: 'badge-voluntariado',
    texto: 'Nossa equipe é formada por pessoas de diferentes idades e profissões, todas unidas pelo mesmo propósito: ajudar o próximo.'
  }
];

function criarCardAjuda(item) {
  return `
    <article class="col-span-6" id="${item.id}">
      <img src="${item.imagem}" alt="${item.alt}" width="900" height="600">
      <h3>${item.titulo}</h3>
      <span class="badge ${item.badgeClasse}">${item.badge}</span>
      <p>${item.texto}</p>
      <a href="#cadastro" data-route="cadastro" class="card-link">${item.linkTexto}</a>
    </article>
  `;
}

function criarCardProjeto(item) {
  return `
    <article class="col-span-6">
      <img src="${item.imagem}" alt="${item.alt}" width="900" height="600">
      <h3>${item.titulo}</h3>
      <span class="badge ${item.badgeClasse}">${item.badge}</span>
      <p>${item.texto}</p>
    </article>
  `;
}

const templates = {

  inicio: () => `
    <section id="apresentacao">
      <img src="img/ong-principal.jpg" alt="Grupo de voluntários da ONG Mãos Amigas reunidos" width="900" height="600">
      <h2>Quem Somos</h2>
      <p>
        A ONG Mãos Amigas é uma organização sem fins lucrativos que atua
        apoiando famílias em situação de vulnerabilidade social. Desde a
        nossa fundação, trabalhamos com doações, voluntariado e projetos
        comunitários para levar dignidade e oportunidade a quem mais precisa.
      </p>
      <h3>Nossa Missão</h3>
      <p>
        Promover a inclusão social por meio de ações solidárias, conectando
        pessoas dispostas a ajudar com comunidades que precisam de apoio.
      </p>
      <p class="contador-social" id="contador-cadastros" aria-live="polite"></p>
    </section>

    <section id="como-ajudar">
      <h2>Como Ajudar</h2>
      <div class="grid-12">
        ${comoAjudarData.map(criarCardAjuda).join('')}
      </div>
    </section>
  `,

  projetos: () => `
    <section id="nossos-projetos">
      <h2>Nossos Projetos</h2>
      <p>Conheça algumas das ações que já realizamos com a ajuda de voluntários e doadores parceiros da nossa causa.</p>
      <div class="grid-12">
        ${projetosData.map(criarCardProjeto).join('')}
      </div>
    </section>
  `,

  cadastro: () => `
    <section id="cadastro">
      <h2>Cadastre-se</h2>
      <p>Preencha o formulário abaixo para se cadastrar como voluntário ou doador. Os campos marcados com <strong>*</strong> são obrigatórios.</p>

      <form id="form-cadastro" action="#" method="post" novalidate>
        <fieldset>
          <legend>Dados Pessoais</legend>
          <label for="nome">Nome completo *</label>
          <input type="text" id="nome" name="nome" required minlength="5" placeholder="Digite seu nome completo" autocomplete="name">
          <span class="campo-msg" id="msg-nome"></span>

          <label for="cpf">CPF *</label>
          <input type="text" id="cpf" name="cpf" required inputmode="numeric" maxlength="14"
                 placeholder="000.000.000-00" pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}"
                 title="Digite o CPF no formato 000.000.000-00" autocomplete="off">
          <span class="campo-msg" id="msg-cpf"></span>

          <label for="nascimento">Data de nascimento *</label>
          <input type="date" id="nascimento" name="nascimento" required max="2015-01-01">
          <span class="campo-msg" id="msg-nascimento"></span>

          <label for="email">E-mail *</label>
          <input type="email" id="email" name="email" required placeholder="seuemail@exemplo.com" autocomplete="email">
          <span class="campo-msg" id="msg-email"></span>

          <label for="telefone">Telefone *</label>
          <input type="tel" id="telefone" name="telefone" required inputmode="numeric" maxlength="13"
                 placeholder="11-91234-5678" pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
                 title="Digite o telefone no formato 11-91234-5678" autocomplete="tel">
          <span class="campo-msg" id="msg-telefone"></span>

          <label for="idade">Idade *</label>
          <input type="number" id="idade" name="idade" required min="18" max="120" placeholder="Ex: 25">
          <span class="campo-msg" id="msg-idade"></span>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <label for="cep">CEP *</label>
          <input type="text" id="cep" name="cep" required inputmode="numeric" maxlength="9"
                 placeholder="00000-000" pattern="[0-9]{5}-[0-9]{3}"
                 title="Digite o CEP no formato 00000-000" autocomplete="postal-code">
          <span class="campo-msg" id="msg-cep"></span>

          <label for="rua">Rua / Avenida</label>
          <input type="text" id="rua" name="rua" placeholder="Nome da rua" autocomplete="address-line1">

          <label for="numero">Número</label>
          <input type="text" id="numero" name="numero" inputmode="numeric" placeholder="Ex: 123">

          <label for="cidade">Cidade</label>
          <input type="text" id="cidade" name="cidade" placeholder="Sua cidade" autocomplete="address-level2">

          <label for="estado">Estado</label>
          <select id="estado" name="estado" autocomplete="address-level1">
            <option value="">Selecione</option>
            <option value="SP" selected>São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
            <option value="PR">Paraná</option>
            <option value="SC">Santa Catarina</option>
            <option value="RS">Rio Grande do Sul</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Participação</legend>
          <label for="participacao">Quero participar como *</label>
          <select id="participacao" name="participacao" required>
            <option value="">Selecione uma opção</option>
            <option value="voluntario">Voluntário</option>
            <option value="doador">Doador</option>
            <option value="ambos">Ambos</option>
          </select>

          <label for="mensagem">Mensagem (opcional)</label>
          <textarea id="mensagem" name="mensagem" rows="4" maxlength="500" placeholder="Conte um pouco sobre como gostaria de ajudar"></textarea>
        </fieldset>

        <fieldset>
          <legend>Confirmação</legend>
          <div class="checkbox-linha">
            <input type="checkbox" id="termos" name="termos" required>
            <label for="termos">
              Li e aceito os
              <button type="button" class="link-modal" id="abrir-termos" aria-haspopup="dialog" aria-controls="modal-termos">termos de uso e a política de privacidade</button>
              *
            </label>
          </div>
        </fieldset>

        <div class="form-actions">
          <button type="submit">Enviar Cadastro</button>
          <p class="alerta" id="form-status" role="status" aria-live="polite"></p>
        </div>
      </form>
    </section>
  `
};

const titulos = {
  inicio: 'ONG Mãos Amigas - Início',
  projetos: 'ONG Mãos Amigas - Projetos',
  cadastro: 'ONG Mãos Amigas - Cadastro'
};

function renderizarRota(rota, ancora) {
  const valida = templates[rota] ? rota : 'inicio';
  const app = document.getElementById('app');

  app.innerHTML = templates[valida]();
  document.title = titulos[valida];
  marcarLinkAtivo(valida);

  // move o foco pro conteúdo novo — prática recomendada de acessibilidade
  // em SPAs (leitor de tela anuncia a mudança), e resolve de quebra um
  // efeito colateral: sem isso, o link clicado continua focado mesmo
  // depois de navegar, e caso esse link estivesse dentro do dropdown,
  // o CSS de :focus-within mantinha o menu aberto "fantasma"
  app.focus();

  if (valida === 'cadastro' && typeof initCadastroForm === 'function') {
    initCadastroForm();
    if (typeof initModalTermos === 'function') initModalTermos();
  }

  if (valida === 'inicio' && typeof initContadorCadastros === 'function') {
    initContadorCadastros();
  }

  if (ancora) {
    const alvo = document.getElementById(ancora);
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function marcarLinkAtivo(rota) {
  document.querySelectorAll('[data-route]').forEach(link => {
    link.classList.toggle('link-ativo', link.getAttribute('data-route') === rota);
  });
}

function rotaAtualDaURL() {
  const hash = location.hash.replace('#', '');
  const [rota, ancora] = hash.split('#');
  return { rota: templates[rota] ? rota : 'inicio', ancora };
}

document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-route]');
    if (!link) return;

    e.preventDefault();
    const rota = link.getAttribute('data-route');
    const ancora = link.dataset.anchor || null;

    const novaURL = ancora ? `#${rota}#${ancora}` : `#${rota}`;
    history.pushState({ rota, ancora }, '', novaURL);
    renderizarRota(rota, ancora);

    const menuPrincipal = document.getElementById('menu-principal');
    const menuToggle = document.getElementById('menu-toggle');
    if (menuPrincipal && menuPrincipal.classList.contains('menu-aberto')) {
      menuPrincipal.classList.remove('menu-aberto');
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    // qualquer navegação fecha o dropdown também — mesmo quando o link
    // clicado é um dos ITENS de dentro dele (ex: "Faça uma Doação"),
    // caso em que a lógica de "fechar ao clicar fora" não dispara sozinha
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
  });

  window.addEventListener('popstate', (e) => {
    const estado = e.state || rotaAtualDaURL();
    renderizarRota(estado.rota, estado.ancora);
  });

  const { rota, ancora } = rotaAtualDaURL();
  renderizarRota(rota, ancora);
});
