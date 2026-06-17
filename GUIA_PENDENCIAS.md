# Guia das pendências — Site Igreja Nova Vida de Botafogo

Este guia cobre **EmailJS** (formulário de contato), **YouTube API** (seção Cultos) e as **imagens** (favicon + og-image). Tudo que você precisa fazer está em passos numerados, com indicação exata de onde colar cada código.

---

## 1. EmailJS — formulário de contato

O código do formulário já está pronto em `src/pages/Contato.jsx`. Ele só precisa dos 3 códigos do EmailJS, que vão em `src/config.js` → `CONTACT.emailjs`. Enquanto estiverem vazios, o formulário mostra um aviso amigável em vez de enviar.

> O template **precisa** usar exatamente estas três variáveis: `{{from_name}}`, `{{reply_to}}` e `{{message}}` — são os nomes que o código envia.

### Passo a passo

1. **Crie a conta**: acesse [emailjs.com](https://www.emailjs.com/) → *Sign Up* (o plano grátis envia 200 e-mails/mês).

2. **Conecte um e-mail (Email Service)**:
   - No painel, vá em **Email Services** → **Add New Service**.
   - Escolha o provedor (o **Gmail** da igreja, `invbotafogo.contato@gmail.com`, é o mais simples — clique em *Connect Account* e autorize).
   - Depois de criado, anote o **Service ID** (algo como `service_xxxxxxx`).

3. **Crie o template (Email Template)**:
   - Vá em **Email Templates** → **Create New Template**.
   - No corpo do e-mail, monte algo assim (pode adaptar o texto):

     ```
     Assunto: Nova mensagem pelo site — {{from_name}}

     Nome: {{from_name}}
     E-mail: {{reply_to}}

     Mensagem:
     {{message}}
     ```

   - Em **Settings** do template, no campo **Reply To**, coloque `{{reply_to}}` (assim você responde direto para quem escreveu).
   - Salve e anote o **Template ID** (algo como `template_xxxxxxx`).

4. **Pegue a Public Key**:
   - Vá em **Account** → **General** (ou **API Keys**) → copie a **Public Key**.

5. **Cole os 3 códigos** em `src/config.js`:

   ```js
   export const CONTACT = {
     // ...
     emailjs: {
       serviceId:  "service_xxxxxxx",   // do passo 2
       templateId: "template_xxxxxxx",  // do passo 3
       publicKey:  "sua_public_key",    // do passo 4
     },
   };
   ```

6. **Restrinja o uso (segurança)**: ainda no painel do EmailJS, em **Account → Security**, ative *Allowed Origins* e adicione o domínio do site (ex.: `https://seudominio.com.br`) e `http://localhost:5173` para testes. Isso impede que outros sites usem sua chave.

7. **Teste**: rode `npm run dev`, preencha o formulário e confira se o e-mail chega. Se der erro, abra o console do navegador (F12) — o EmailJS costuma dizer o motivo (template com variável errada ou origem não autorizada).

---

## 2. YouTube API — seção Cultos

O código em `src/pages/Cultos.jsx` busca os 3 últimos vídeos do canal com a tag `pregação`. O `channelId` já está preenchido. Falta só a `apiKey` em `src/config.js` → `YOUTUBE.apiKey`. Sem ela, a página mostra exemplos (fallback).

### ⚠️ Aviso de segurança (importante)

Uma chave de API colocada direto no site **fica visível** para qualquer visitante (basta abrir o código-fonte). Isso é comum e aceitável **se** você **restringir a chave** (passo 4 abaixo) ao seu domínio e **apenas à YouTube Data API**. Assim, mesmo que alguém copie a chave, ela só funciona a partir do seu site. Faça a restrição — não pule.

> **Alternativa mais segura (opcional):** em vez de usar a chave no site, um robô do GitHub (GitHub Action) roda 1x por dia, busca os vídeos e salva um `videos.json`. O site lê esse arquivo e a chave nunca aparece publicamente. O código já suporta isso: basta preencher `YOUTUBE.videosUrl` com a URL do `videos.json`. Se quiser seguir por aí depois, me avise que eu monto a Action.

### Passo a passo (chave direta)

1. **Acesse** o [Google Cloud Console](https://console.cloud.google.com/) com a conta Google da igreja.

2. **Crie um projeto**: topo da tela → seletor de projetos → **Novo projeto** → nome (ex.: "Site Igreja") → criar.

3. **Ative a API**: menu → **APIs e serviços** → **Biblioteca** → procure por **YouTube Data API v3** → **Ativar**.

4. **Crie a chave**: **APIs e serviços** → **Credenciais** → **Criar credenciais** → **Chave de API**. Copie a chave.

5. **Restrinja a chave** (clique no nome da chave recém-criada):
   - Em **Restrições de aplicativo** → selecione **Sites (Websites)** e adicione:
     - `seudominio.com.br/*` e `*.seudominio.com.br/*` (troque pelo domínio real)
     - `localhost:5173/*` (para testes no seu computador)
   - Em **Restrições de API** → **Restringir chave** → marque **YouTube Data API v3**.
   - Salve.

6. **Cole no site** em `src/config.js`:

   ```js
   export const YOUTUBE = {
     videosUrl: "",
     apiKey: "SUA_CHAVE_AQUI",
     channelId: "UCLuWhw8fYakYDzM9SlNXVKg", // já preenchido
     tag: "pregação",
     // ...
   };
   ```

7. **Garanta a tag nos vídeos**: para um vídeo aparecer em Cultos, ele precisa ter a tag `pregação` no YouTube (Studio → editar vídeo → **Mostrar mais** → **Tags**). Se nenhum vídeo tiver a tag, o site mostra os mais recentes mesmo assim, com um aviso.

> **Cota:** o plano grátis dá 10.000 unidades/dia — muito mais que o suficiente para um site de igreja. Cada carregamento da página Cultos gasta pouquíssimo.

---

## 3. Imagens — favicon e og-image

- O **favicon** novo (`public/favicon.svg`, uma cruz dourada na identidade da igreja) já substituiu o placeholder antigo e o `index.html` já aponta para ele. Navegadores modernos usam o SVG automaticamente.
- Para gerar os arquivos **PNG** (fallback do favicon e o cartão de compartilhamento), abra o arquivo **`gerar-imagens.html`** (na raiz do projeto) no navegador, espere as fontes carregarem e clique nos botões para baixar:
  - `og-image.jpg`
  - `favicon.png`
  - `apple-touch-icon.png`
- **Salve os 3 arquivos na pasta `public/`.**

### Depois de publicar (og-image absoluto)

Os links de imagem precisam ser **absolutos** para o cartão aparecer no WhatsApp/Facebook. Quando tiver o domínio, edite o `index.html` e troque:

```html
<meta property="og:image" content="https://seudominio.com.br/og-image.jpg" />
<meta property="og:url"   content="https://seudominio.com.br" />
<meta name="twitter:image" content="https://seudominio.com.br/og-image.jpg" />
```

Para testar como o cartão aparece, use o [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (cole a URL do site e clique em *Scrape Again*).
