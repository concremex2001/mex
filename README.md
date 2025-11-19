# Site estatico para GitHub Pages

Estrutura minima pronta para publicacao.

## Publicacao rapida (GitHub Pages via Actions)
1. Crie um repositorio no GitHub e faca upload de **todos os arquivos** deste ZIP.
2. Garanta que o branch padrao e `main`.
3. Va em **Settings > Pages** e verifique se a fonte e **GitHub Actions**.
4. No primeiro push para `main`, o workflow `Deploy static site to Pages` fara o deploy.
5. O endereco ficara em `https://SEU_USUARIO.github.io/NOME_DO_REPO/`.

## Estrutura
```
.
├── .github/workflows/pages.yml   # Deploy automatico
├── assets/
│   ├── css/styles.css
│   └── js/main.js
├── index.html
├── robots.txt
├── sitemap.xml
├── LICENSE
└── README.md
```

## Customizacao
- Edite `index.html`, `assets/css/styles.css` e `assets/js/main.js`.
- Se usar dominio customizado, crie um arquivo `CNAME` na raiz com o dominio.

## Backend (Conta Azul)
- A pasta `concremex-api/` contem um backend Node.js (Express + Conta Azul).
- Configuracao local: crie `concremex-api/.env` com `CONTA_AZUL_ACCESS_TOKEN=SEU_TOKEN_AQUI`, execute `npm install` e `npm start`.
- Endpoint principal: `POST /api/contaazul/orcamento`.

## Deploy no Render
- Root Directory: `concremex-api`
- Build Command: `npm install`
- Start Command: `npm start`

## Suporte
Se precisar de layout corporativo ou paginas adicionais, solicite que eu gere um novo pacote.
