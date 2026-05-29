# Sistema de Gestão de Barbearia — Como Rodar

## Tecnologias
- **Backend**: Node.js + Express
- **Banco de dados**: Firebase Firestore (NoSQL)
- **Frontend**: HTML, CSS e JavaScript puro
- **Deploy**: Backend no Render · Frontend no Vercel

---

## 1. Configurar o Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Crie um novo projeto (ex: `barbearia-pp`)
3. Vá em **Firestore Database** → Criar banco → Modo de produção → escolha uma região
4. Vá em **Configurações do Projeto** → **Contas de serviço** → **Gerar nova chave privada**
5. Renomeie o arquivo baixado para `serviceAccountKey.json`
6. Coloque o arquivo dentro da pasta `backend/`

> ⚠️ Nunca suba o `serviceAccountKey.json` para o GitHub! Ele já está no `.gitignore`.

---

## 2. Rodar o backend localmente

```bash
cd backend
npm install
npm run dev
```

O servidor sobe em `http://localhost:3001`

---

## 3. Rodar o frontend localmente

Abra o arquivo `frontend/index.html` diretamente no navegador,  
ou use a extensão **Live Server** do VS Code.

A URL do backend já está configurada como `http://localhost:3001` nas páginas HTML.

---

## 4. Deploy do Backend no Render (gratuito)

1. Crie uma conta em [render.com](https://render.com)
2. Novo → **Web Service** → conecte seu repositório GitHub
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Em **Environment** → adicione uma variável de ambiente:
   - `PORT` = `3001`
5. Suba o `serviceAccountKey.json` como **Secret File** em `/etc/secrets/serviceAccountKey.json`
   - Atualize `backend/database/firebase.js` para usar esse caminho em produção:
     ```js
     const serviceAccount = require('/etc/secrets/serviceAccountKey.json');
     ```
6. Copie a URL do Render (ex: `https://barbearia-api.onrender.com`)

---

## 5. Deploy do Frontend no Vercel (gratuito)

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Novo projeto → conecte o repositório → configure:
   - **Root Directory**: `frontend`
3. Antes do deploy, atualize a URL do backend nas 3 páginas HTML:
   ```js
   window.API_URL = 'https://barbearia-api.onrender.com'; // URL do Render
   ```
4. Faça o deploy — a Vercel gera uma URL pública automaticamente.

---

## Endpoints da API

| Método | Endpoint                            | Descrição                        |
|--------|-------------------------------------|----------------------------------|
| GET    | /agendamentos                       | Listar todos                     |
| GET    | /agendamentos/:id                   | Buscar por id                    |
| POST   | /agendamentos                       | Inserir novo                     |
| PUT    | /agendamentos/:id                   | Atualizar                        |
| DELETE | /agendamentos/:id                   | Deletar                          |
| POST   | /agendamentos/:id/calcular-valor    | **Processo Decorator**           |
| GET    | /barbeiros                          | Listar todos                     |
| GET    | /barbeiros/:id                      | Buscar por id                    |
| POST   | /barbeiros                          | Inserir novo (cria endereço)     |
| PUT    | /barbeiros/:id                      | Atualizar                        |
| DELETE | /barbeiros/:id                      | Deletar                          |

---

## Padrões de Projeto Utilizados

| Padrão        | Onde está                                     |
|---------------|-----------------------------------------------|
| MVC           | models/ + routes/ (controller) + frontend/    |
| DAO           | dao/AgendamentoDAO, BarbeiroDAO, EnderecoDAO  |
| Builder       | builder/AgendamentoBuilder, BarbeiroBuilder   |
| Factory Method| factory/AgendamentoFactory, BarbeiroFactory   |
| Command       | commands/ (11 commands)                       |
| **Decorator** | decorator/ (IServico → CorteBase → 4 extras)  |
| DIP (SOLID)   | IDao, ICommand (abstrações)                   |
| LSP (SOLID)   | Todos os DAOs e Decorators implementam corretamente |
| OCP (SOLID)   | Novos decoradores sem modificar existentes    |
| SRP (SOLID)   | Cada arquivo tem uma única responsabilidade   |

---

## Relacionamentos

- **Barbeiro → Endereço** (1:1) — um barbeiro tem um endereço
- **Barbeiro → Agendamentos** (1:N) — um barbeiro atende muitos agendamentos
