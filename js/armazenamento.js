/* ===================================================================
   MÓDULO: armazenamento.js
   Responsabilidade única: ler e escrever no localStorage. Não sabe
   nada sobre validação, máscara ou como a tela é montada — só guarda
   e devolve dados.
   =================================================================== */

const CHAVE_RASCUNHO = 'ongCadastroRascunho';
const CHAVE_CADASTROS = 'ongCadastros';
const CAMPOS_RASCUNHO = ['nome', 'cpf', 'nascimento', 'email', 'telefone', 'idade', 'cep', 'rua', 'numero', 'cidade', 'estado', 'participacao', 'mensagem'];

/* ---------- rascunho (dados ainda não enviados) ---------- */
function salvarRascunho() {
  const dados = {};
  CAMPOS_RASCUNHO.forEach(id => {
    const campo = document.getElementById(id);
    if (campo) dados[id] = campo.value;
  });
  localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
}

function carregarRascunho() {
  const salvo = localStorage.getItem(CHAVE_RASCUNHO);
  if (!salvo) return false;

  try {
    const dados = JSON.parse(salvo);
    let algumCampoPreenchido = false;
    CAMPOS_RASCUNHO.forEach(id => {
      const campo = document.getElementById(id);
      if (campo && dados[id]) {
        campo.value = dados[id];
        algumCampoPreenchido = true;
      }
    });
    return algumCampoPreenchido;
  } catch (erro) {
    localStorage.removeItem(CHAVE_RASCUNHO);
    return false;
  }
}

function limparRascunho() {
  localStorage.removeItem(CHAVE_RASCUNHO);
}

/* ---------- histórico de cadastros enviados ---------- */
function salvarCadastro(registro) {
  const cadastros = JSON.parse(localStorage.getItem(CHAVE_CADASTROS) || '[]');
  cadastros.push(registro);
  localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(cadastros));
}

function obterCadastros() {
  const salvos = localStorage.getItem(CHAVE_CADASTROS);
  return salvos ? JSON.parse(salvos) : [];
}
