/* ===================================================================
   MÓDULO: cadastro.js
   Responsabilidade: ORQUESTRAR os módulos menores (mascaras.js,
   validacao.js, armazenamento.js, notificacoes.js) no formulário de
   cadastro. Não reimplementa nada deles — só decide a ORDEM e reage
   ao envio. É chamado pelo router.js toda vez que a rota "cadastro"
   é renderizada, porque o <form> é recriado do zero a cada navegação.
   =================================================================== */

function initCadastroForm() {
  const form = document.getElementById('form-cadastro');
  const status = document.getElementById('form-status');
  if (!form) return;

  iniciarMascaras();     // mascaras.js
  iniciarValidacao();    // validacao.js

  // restaura o rascunho salvo (armazenamento.js) e avisa a pessoa
  if (carregarRascunho()) {
    status.textContent = 'Continuando de onde você parou (rascunho recuperado).';
    status.className = 'alerta alerta-sucesso';
  }

  // cada tecla digitada no form inteiro salva o rascunho de novo (delegação)
  form.addEventListener('input', salvarRascunho);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validarConsistenciaIdade();

    if (!validarFormularioInteiro()) {
      status.textContent = 'Verifique os campos destacados antes de enviar.';
      status.className = 'alerta alerta-erro';
      const primeiroErro = form.querySelector('.campo-invalido');
      if (primeiroErro) primeiroErro.focus();
      return;
    }

    const botaoEnviar = form.querySelector('button[type="submit"]');
    const nome = document.getElementById('nome').value;

    salvarCadastro({
      nome,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      participacao: document.getElementById('participacao').value,
      enviadoEm: new Date().toISOString()
    });
    limparRascunho();

    botaoEnviar.disabled = true;
    status.textContent = `Cadastro de ${nome} enviado com sucesso! Em breve entraremos em contato.`;
    status.className = 'alerta alerta-sucesso';
    mostrarToast(`Bem-vindo(a), ${nome}! Recebemos seu cadastro.`);
    form.reset();

    setTimeout(() => { botaoEnviar.disabled = false; }, 2000);
  });
}

/* lê o histórico (armazenamento.js) e escreve o resumo na home */
function initContadorCadastros() {
  const elemento = document.getElementById('contador-cadastros');
  if (!elemento) return;

  const cadastros = obterCadastros();
  if (cadastros.length === 0) { elemento.textContent = ''; return; }

  const ultimo = cadastros[cadastros.length - 1];
  elemento.textContent = `${cadastros.length} pessoa(s) já se cadastraram — a última foi ${ultimo.nome}, em ${new Date(ultimo.enviadoEm).toLocaleDateString('pt-BR')}.`;
}
