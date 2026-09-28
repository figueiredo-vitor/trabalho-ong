/* ===================================================================
   MÓDULO: mascaras.js
   Responsabilidade única: formatar o valor de um campo enquanto a
   pessoa digita (CPF, telefone, CEP). Não sabe nada sobre validação,
   localStorage ou envio de formulário — só transforma texto em texto.
   =================================================================== */

function mascararCPF(valor) {
  return valor.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function mascararTelefone(valor) {
  valor = valor.replace(/\D/g, '').slice(0, 11);
  return valor.replace(/(\d{2})(\d)/, '$1-$2').replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}

function mascararCEP(valor) {
  return valor.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d{1,3})$/, '$1-$2');
}

/* aplica uma função de máscara a um campo, pelo id */
function aplicarMascara(id, funcaoMascara) {
  const campo = document.getElementById(id);
  if (!campo) return;
  campo.addEventListener('input', (e) => {
    e.target.value = funcaoMascara(e.target.value);
  });
}

/* ponto de entrada do módulo: liga as 3 máscaras do formulário de cadastro */
function iniciarMascaras() {
  aplicarMascara('cpf', mascararCPF);
  aplicarMascara('telefone', mascararTelefone);
  aplicarMascara('cep', mascararCEP);
}
