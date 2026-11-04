# Portfólio — Vinícius Ferreira

Portfólio narrativo em React, TypeScript, Vite e Tailwind CSS, com animações via Framer Motion e globo 3D com React Three Fiber.

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm

## Desenvolvimento local

```bash
npm install
npm run dev
```

O Vite informa o endereço local no terminal (normalmente `http://localhost:5173`).

## Build e verificação

```bash
npm run typecheck
npm run build
npm run preview
```

O build estático é gerado na pasta `dist/`.

## Deploy gratuito na Vercel

1. Crie um repositório **público ou privado** no GitHub e envie os arquivos deste projeto:

   ```bash
   git init
   git add .
   git commit -m "feat: cria portfolio interativo"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```

   Troque `SEU_USUARIO` e `SEU_REPOSITORIO` pelos valores do seu repositório.

2. Entre em [vercel.com](https://vercel.com), crie uma conta ou entre com GitHub e autorize o acesso ao repositório.
3. Selecione **Add New → Project** e importe o repositório.
4. Confira as configurações:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Selecione **Deploy**. Não são necessárias variáveis de ambiente para este portfólio.
6. A Vercel fornecerá um domínio `*.vercel.app`. Cada push na branch configurada dispara um novo deploy; branches adicionais podem gerar previews.

### Publicação pelo terminal (alternativa)

```bash
npm install --global vercel
vercel login
vercel
vercel --prod
```

Na primeira execução, confirme as opções interativas para vincular ou criar o projeto. Para uso gratuito, mantenha o projeto no plano Hobby e confira os limites atuais da Vercel.

## Personalização

- Conteúdo da abertura e diálogos: `src/components/TerminalHero.tsx` e `src/components/DialogueAbout.tsx`
- Tecnologias e descrições: `src/components/TechGlobe.tsx`
- Experiência: `src/components/CircuitsExperience.tsx`
- Repositórios e cases: `src/components/SpiralProjects.tsx`
- Cores, tipografia e efeitos: `tailwind.config.js` e `src/styles.css`

As tecnologias estão descritas como experiência profissional, conhecimento aplicado ou em desenvolvimento. Os repositórios acadêmicos apontam para projetos públicos; o case profissional da Tvlar Motors é identificado sem link por não possuir código público.
