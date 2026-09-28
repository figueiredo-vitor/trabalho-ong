# ONG Mãos Amigas — Plataforma Web

Aplicação front-end (Single Page Application) para uma organização do
terceiro setor fictícia, permitindo apresentar a instituição, divulgar
projetos realizados e captar cadastros de voluntários e doadores.

---

## Visão geral do projeto

O projeto nasceu como um site institucional tradicional (multi-página) e
evoluiu, ao longo do desenvolvimento, para uma **SPA em Vanilla
JavaScript**: uma única página HTML injeta o conteúdo de cada "rota"
(Início, Projetos, Cadastro) dinamicamente em `<main id="app">`,
interceptando a navegação via `history.pushState`/hash, sem depender de
nenhum framework (React, Vue, etc.).

O formulário de cadastro inclui máscaras de CPF/telefone/CEP, validação
nativa HTML5 reforçada por JavaScript, persistência de rascunho e
histórico via `localStorage`, e uma checagem de consistência (idade x
data de nascimento) usando a biblioteca externa `dayjs`.

---

## Tecnologias utilizadas

| Camada | Tecnologia | Onde entra no projeto |
|---|---|---|
| Estrutura | HTML5 semântico | `header`, `nav`, `main`, `section`, `article`, `footer`, `fieldset`/`legend` |
| Estilo | CSS3 (Custom Properties) | Design system (`:root` com variáveis de cor/tipografia/espaçamento), Grid de 12 colunas, Flexbox |
| Comportamento | JavaScript (ES6+), Vanilla, modularizado | Roteamento de SPA, validação, máscaras, `localStorage` |
| Biblioteca externa | [dayjs](https://day.js.org/) via CDN | Cálculo de idade a partir da data de nascimento |
| Testes | [Playwright](https://playwright.dev/) (Python) | Testes end-to-end manuais durante o desenvolvimento (não faz parte do artefato final entregue) |

Não há build step, bundler ou transpilador — todo o JavaScript roda
nativamente no navegador, carregado via tags `<script>` simples.

---

## Estrutura de pastas

```
/
├── index.html              # ponto de entrada (casca da SPA)
├── css/
│   └── style.css           # design system + todos os componentes visuais
├── js/
│   ├── router.js           # templates de rota + interceptação de navegação
│   ├── cadastro.js         # orquestra máscaras + validação + storage no form
│   ├── mascaras.js         # formatação de CPF/telefone/CEP
│   ├── validacao.js        # validação de campos + checagem de consistência
│   ├── armazenamento.js    # leitura/escrita no localStorage
│   ├── notificacoes.js     # toast de confirmação
│   ├── interacoes.js       # menu hambúrguer + dropdown
│   └── modal.js            # modal de termos de uso
├── img/                    # imagens em .jpg e .webp
└── README.md
```

---

## Pré-requisitos

- Qualquer navegador moderno (Chrome, Firefox, Edge ou Safari atualizados)
- Conexão com a internet **apenas** para carregar a biblioteca `dayjs`
  via CDN (o restante da aplicação funciona 100% offline)
- Não é necessário Node.js, npm ou qualquer gerenciador de pacotes —
  não há dependências instaláveis

---

## Como executar o projeto

Como é um projeto 100% estático (sem build), há duas formas de rodar:

**Opção 1 — abrir direto no navegador**
```
Abra o arquivo index.html com duplo clique ou "Abrir com" → navegador.
```

**Opção 2 — servir por um servidor local (recomendado)**
```bash
python3 -m http.server 8000
```
Depois acesse: `http://localhost:8000/`

**GitHub Pages**
1. Suba os arquivos na raiz do repositório (index.html, css/, js/, img/).
2. Em Settings → Pages, escolha a branch (main) e a pasta `/ (root)`.
3. Acesse: `https://seu-usuario.github.io/nome-do-repo/`

---

## "Build" e testes

Não existe comando de build — não há etapa de compilação/transpilação
neste projeto (Vanilla JS + CSS puro).

Os testes end-to-end foram escritos em Python com Playwright durante o
desenvolvimento (navegação entre rotas, validação de formulário,
persistência em `localStorage`, comportamento do menu/dropdown), mas
não fazem parte do artefato entregue ao usuário final — servem apenas
como registro do processo de QA descrito no relatório de testes deste
projeto.

---

## Convenções do projeto

- Commits seguem [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `refactor`, `style`)
- Versionamento segue [SemVer](https://semver.org/) (`MAJOR.MINOR.PATCH`)
- JavaScript organizado em módulos de responsabilidade única, carregados
  via `<script>` na ordem de dependência (ver comentário no `index.html`)
