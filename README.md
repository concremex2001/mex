# Site estático para GitHub Pages

Estrutura mínima pronta para publicação.

## Publicação rápida (GitHub Pages via Actions)
1. Crie um repositório no GitHub e faça upload de **todos os arquivos** deste ZIP.
2. Garanta que o branch padrão é `main`.
3. Vá em **Settings › Pages** e verifique se a fonte é **GitHub Actions**.
4. No primeiro push para `main`, o workflow `Deploy static site to Pages` fará o deploy.
5. O endereço ficará em `https://SEU_USUARIO.github.io/NOME_DO_REPO/`.

## Estrutura
```
.
├── .github/workflows/pages.yml   # Deploy automático
├── assets/
│   ├── css/styles.css
│   └── js/main.js
├── index.html
├── robots.txt
├── sitemap.xml
├── LICENSE
└── README.md
```

## Customização
- Edite `index.html`, `assets/css/styles.css` e `assets/js/main.js`.
- Se usar domínio customizado, crie um arquivo `CNAME` na raiz com o domínio.

## Suporte
Se precisar de layout corporativo ou páginas adicionais, solicite que eu gere um novo pacote.
