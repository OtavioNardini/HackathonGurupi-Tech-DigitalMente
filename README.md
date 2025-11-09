# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7be97bfa-38cd-471d-93b2-f27d92600411

# HackathonGurupi-Tech-DigitalMente

Plataforma web para submissão e gestão de propostas de projetos — formulário com validação, pré-visualização e UI acessível, construída com React + TypeScript.

## Sobre

Este repositório contém a aplicação web desenvolvida durante o Hackathon Gurupi Tech (projeto "DigitalMente"). A aplicação permite que usuários submetam propostas de projetos com campos obrigatórios (título, resumo, pesquisador responsável, instituição e datas), visualize uma pré-visualização antes do envio e receba feedback via toasts. O projeto usa uma biblioteca de componentes locais e utilitários modernos (Vite, Tailwind, shadcn-ui / Radix).

## Funcionalidades

- Formulário de submissão com validação de schema (Zod + react-hook-form)
- Pré-visualização dos dados antes da confirmação
- Componentes de UI reutilizáveis (cards, inputs, botões, labels)
- Feedback por toast após envio

## Tecnologias

Baseado no package.json do projeto, as principais tecnologias são:

- React
- TypeScript
- Vite
- Tailwind CSS
- react-hook-form
- Zod
- Radix UI (componentes @radix-ui)
- shadcn-ui (estilos/utilitários e componentes locais)

## Scripts úteis

Os scripts disponíveis no `package.json` (use npm):

- `npm run dev` — inicia o servidor de desenvolvimento (Vite)
- `npm run build` — gera a build de produção
- `npm run build:dev` — build em modo development
- `npm run preview` — serve a build gerada localmente
- `npm run lint` — executa ESLint

Exemplo de execução (PowerShell/terminal):

```powershell
# instalar dependências
npm install

# rodar em desenvolvimento
npm run dev
```

Se você usa `pnpm` ou `bun`, substitua os comandos de instalação/execução de acordo.

## Estrutura do projeto (resumida)

- `src/components/` — componentes compartilhados e biblioteca de UI
- `src/pages/` — páginas da aplicação (`Index.tsx`, `PropostaPesquisa.tsx`, etc.)
- `src/lib/` — utilitários
- `src/assets/` — imagens e assets
- `src/main.tsx`, `src/App.tsx` — ponto de entrada e roteamento

## Como rodar localmente

1. Clone o repositório
	```sh
	git clone <URL-DO-REPO>
	cd HackathonGurupi-Tech-DigitalMente
	```

2. Instale dependências
	```sh
	npm install
	```

3. Rode em modo desenvolvimento
	```sh
	npm run dev
	```

4. Abra o navegador (normalmente http://localhost:5173)

## Contribuindo

- Abra uma issue para discutir mudanças ou reportar bugs
- Crie uma branch: `git checkout -b feat/minha-melhoria`
- Faça commits pequenos e claros
- Abra um Pull Request descrevendo a alteração

Se quiser, posso gerar um `CONTRIBUTING.md` e templates de issue/PR.

## Licença

Adicione aqui a licença do projeto (ex.: MIT). Se preferir, posso adicionar um `LICENSE` com MIT.

## Contato

Abra uma issue no repositório para dúvidas ou entre em contato com os mantenedores do projeto.

---

Se quiser que eu também adicione badges, CI (GitHub Actions) ou que adapte o README para `pnpm`/`bun`, me diga qual opção prefere.
