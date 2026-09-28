/* ===================================================================
   MÓDULO: validacao.js
   Responsabilidade única: dizer se um campo está válido, escrever a
   mensagem de erro certa e ligar/desligar as classes visuais.
   Depende só do DOM + da API nativa de validação do HTML5 (e do dayjs,
   só na checagem cruzada de idade x nascimento).
   =================================================================== */

const CAMPOS_VALIDAVEIS = ['nome', 'cpf', 'nascimento', 'email', 'telefone', 'idade', 'cep'];

/* traduz o ValidityState nativo pra uma mensagem em português */
function mensagemDeErroPara(campo) {
  const v = campo.validity;
  if (v.valueMissing) return 'Este campo é obrigatório.';
  if (v.typeMismatch) return 'Formato inválido para este campo.';
  if (v.patternMismatch) return campo.title || 'Formato inválido.';
  if (v.tooShort) return `Digite pelo menos ${campo.minLength} caracteres.`;
  if (v.rangeUnderflow) return `O valor mínimo é ${campo.min}.`;
  if (v.rangeOverflow) return `O valor máximo é ${campo.max}.`;
  if (v.customError) return campo.validationMessage;
  return 'Valor inválido.';
}

/* valida 1 campo: escreve a mensagem no <span> ao lado e liga a classe certa */
function validarCampo(campo) {
  const msg = document.getElementById('msg-' + campo.id);
  if (!msg) return true;

  if (campo.value === '' && !campo.hasAttribute('required')) {
    campo.classList.remove('campo-invalido', 'campo-valido');
    msg.textContent = '';
    return true;
  }

  if (campo.checkValidity()) {
    campo.classList.remove('campo-invalido');
    campo.classList.add('campo-valido');
    msg.textContent = '';
    return true;
  }

  campo.classList.remove('campo-valido');
  campo.classList.add('campo-invalido');
  msg.textContent = mensagemDeErroPara(campo);
  return false;
}

/* liga blur + input no campo, pra validar ao sair e depois em tempo real */
function ligarValidacaoAoVivo(id) {
  const campo = document.getElementById(id);
  if (!campo) return;

  campo.addEventListener('blur', () => validarCampo(campo));
  campo.addEventListener('input', () => {
    if (campo.classList.contains('campo-invalido') || campo.classList.contains('campo-valido')) {
      validarCampo(campo);
    }
  });
}

/* checagem cruzada: a idade digitada bate com a data de nascimento? (usa dayjs) */
function validarConsistenciaIdade() {
  const nascimentoEl = document.getElementById('nascimento');
  const idadeEl = document.getElementById('idade');
  if (!nascimentoEl || !idadeEl) return;

  if (!nascimentoEl.value || !idadeEl.value || typeof dayjs === 'undefined') {
    idadeEl.setCustomValidity('');
    return;
  }

  const idadeCalculada = dayjs().diff(dayjs(nascimentoEl.value), 'year');
  const idadeDigitada = parseInt(idadeEl.value, 10);

  if (Math.abs(idadeCalculada - idadeDigitada) > 1) {
    idadeEl.setCustomValidity(`A idade não bate com a data de nascimento (esperado: ${idadeCalculada} anos).`);
  } else {
    idadeEl.setCustomValidity('');
  }
  validarCampo(idadeEl);
}

/* valida TODOS os campos de uma vez (usado no submit) — devolve true só se todos passarem */
function validarFormularioInteiro() {
  const resultados = CAMPOS_VALIDAVEIS.map(id => validarCampo(document.getElementById(id)));
  return resultados.every(ok => ok);
}

/* ponto de entrada do módulo: liga a validação viva + a checagem de idade */
function iniciarValidacao() {
  CAMPOS_VALIDAVEIS.forEach(ligarValidacaoAoVivo);
  const nascimentoEl = document.getElementById('nascimento');
  const idadeEl = document.getElementById('idade');
  if (nascimentoEl) nascimentoEl.addEventListener('input', validarConsistenciaIdade);
  if (idadeEl) idadeEl.addEventListener('input', validarConsistenciaIdade);
}
