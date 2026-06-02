# Barbearia Don Mateus - Sistema de Gestão de Barbeiros e Agendamentos

Sistema web completo para gerenciar barbeiros e agendamentos, desenvolvido com Node.js, Firebase Firestore, HTML, CSS e JavaScript. Projeto da disciplina de Padroes de Projeto, Turma 5A, Engenharia de Software.

**Acesse o sistema:** [barbearia-don-mateus.vercel.app](https://barbearia-don-mateus.vercel.app)

---

## Tecnologias

- **Backend:** Node.js com Express
- **Banco de dados:** Firebase Firestore (NoSQL)
- **Frontend:** HTML, CSS e JavaScript puro
- **Deploy:** Backend no Render, Frontend no Vercel

---

## Padroes de Projeto Implementados

| Padrao | Onde esta no codigo |
|---|---|
| MVC | `models/`, `routes/` (controller), `frontend/` (view) |
| DAO | `dao/BarbeiroDAO.js`, `AgendamentoDAO.js`, `EnderecoDAO.js` |
| Builder | `builder/BarbeiroBuilder.js`, `AgendamentoBuilder.js` |
| Factory Method | `factory/BarbeiroFactory.js`, `AgendamentoFactory.js` |
| Command | `commands/` (11 commands, todos implementam ICommand) |
| **Decorator** | `decorator/` (IServico, CorteBase, ServicoDecorator, 4 decoradores) |
| DIP, LSP, SRP, OCP | Aplicados via IDao e ICommand em todo o projeto |

---

## Relacionamentos

- **Barbeiro, Endereco (1:1):** cada barbeiro possui um endereco unico cadastrado separadamente
- **Barbeiro, Agendamentos (1:N):** um barbeiro pode ter muitos agendamentos vinculados

---

## Como Rodar Localmente

### 1. Configurar o Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Crie um projeto e ative o **Firestore Database** em modo de producao
3. Va em **Configuracoes do Projeto**, **Contas de servico**, **Gerar nova chave privada**
4. Renomeie o arquivo para `serviceAccountKey.json` e coloque dentro da pasta `backend/`

> O arquivo `serviceAccountKey.json` ja esta no `.gitignore` e nao sera enviado ao GitHub.

### 2. Rodar o backend

```bash
cd backend
npm install
npm run dev
```

O servidor sobe em `http://localhost:3001`

### 3. Abrir o frontend

Abra o arquivo `frontend/index.html` no navegador ou use a extensao **Live Server** do VS Code.

---

## Deploy

### Backend no Render

1. Crie uma conta em [render.com](https://render.com) e conecte o repositorio GitHub
2. Novo **Web Service** com as configuracoes:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. Em **Environment Variables**, adicione a variavel `FIREBASE_CREDENTIALS` com o conteudo completo do `serviceAccountKey.json` como texto JSON

### Frontend no Vercel

1. Crie uma conta em [vercel.com](https://vercel.com) e conecte o repositorio
2. Configure **Root Directory** como `frontend`
3. Faca o deploy, a Vercel gera a URL automaticamente

---

## Endpoints da API REST

| Metodo | Endpoint | Descricao |
|---|---|---|
| GET | /barbeiros | Listar todos os barbeiros |
| GET | /barbeiros/:id | Buscar barbeiro por id |
| POST | /barbeiros | Inserir barbeiro (cria endereco automaticamente) |
| PUT | /barbeiros/:id | Atualizar barbeiro e endereco |
| DELETE | /barbeiros/:id | Deletar barbeiro |
| GET | /agendamentos | Listar todos os agendamentos |
| GET | /agendamentos/:id | Buscar agendamento por id |
| POST | /agendamentos | Inserir agendamento |
| PUT | /agendamentos/:id | Atualizar agendamento |
| DELETE | /agendamentos/:id | Deletar agendamento |
| POST | /agendamentos/:id/calcular-valor | Calcular valor com o Decorator |

---

## Funcionalidade do Decorator

O endpoint `POST /agendamentos/:id/calcular-valor` e o processo de negocio automatizado do sistema. Ele recebe os servicos extras escolhidos e encadeia os Decorators para calcular o valor total:

```json
{
  "extras": ["barba", "hidratacao", "sobrancelha"]
}
```

O backend monta a cadeia: `CorteBase (R$ 30) -> DecoratorBarba (+R$ 20) -> DecoratorHidratacao (+R$ 25) -> DecoratorSobrancelha (+R$ 10)` e retorna o valor total de R$ 85,00 com a descricao completa dos servicos.
