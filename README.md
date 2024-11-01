# Quimicando

**Quimicando** é um jogo educativo de química em que os jogadores têm o desafio de adivinhar uma molécula diferente a cada dia. O jogo inclui funcionalidades de login e registro, autenticação JWT e controle de acertos e tentativas através do backend, permitindo que os jogadores acompanhem seu progresso diário e retornem ao jogo sem perder suas tentativas já realizadas.

## Estrutura do Projeto

- **Backend**: Diretório `backend/`, construído com [NestJS](https://nestjs.com/).
- **Frontend**: Diretório `frontend/`, desenvolvido com [Next.js](https://nextjs.org/).
- **Banco de Dados**: MongoDB é utilizado para armazenar informações sobre os jogadores, moléculas e registros de tentativas.

## Funcionalidades do Jogo

1. **Uma Molécula por Dia**: Cada dia, uma nova molécula é disponibilizada para os jogadores tentarem adivinhar. As informações e dicas da molécula são gerenciadas pelo backend.

2. **Login e Registro de Usuário**: 
   - O sistema de autenticação permite que os usuários se registrem e façam login com segurança.
   - É utilizado JWT para autenticação, garantindo que cada jogador tenha uma sessão segura.

3. **Controle de Sessão e Tentativas**:
   - O backend mantém o registro das tentativas de cada jogador, garantindo que tentativas anteriores não sejam perdidas caso o jogador retorne mais tarde.
   - Cada jogador tem direito a uma tentativa diária, e o controle de acertos é gerenciado pelo backend.

## Configuração e Execução

Para rodar o Quimicando localmente, siga as instruções abaixo. O projeto utiliza Docker e Docker Compose para facilitar a configuração e execução.

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) instalados.

### Passo a Passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/LucasAro/Quimicando.git
   ```

2. **Acesse o diretório do projeto**:
   ```bash
   cd Quimicando
   ```

3. **Inicie os serviços com Docker Compose**:
   ```bash
   docker-compose up --build
   ```

   Este comando irá construir as imagens Docker e iniciar os contêineres para o backend, frontend e MongoDB.

### Acessando a Aplicação

- **Frontend**: Acesse `http://localhost:3000` no navegador para jogar.
- **Backend**: A API estará disponível em `http://localhost:3001`.

## Endpoints e Uso da API

### Cadastro de Molécula

Para começar, cadastre a primeira molécula no banco de dados. O endpoint **POST** `/molecule` permite adicionar uma molécula nova. Veja o exemplo de requisição:

#### Exemplo de Requisição com `curl`

```bash
curl --location --request POST 'http://localhost:3001/molecule' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Metano",
  "formula": "CH4",
  "hints": [
    "Gás incolor e inodoro",
    "Principal componente do gás natural",
    "Composto por um átomo de carbono e quatro átomos de hidrogênio",
    "É um hidrocarboneto simples com estrutura tetraédrica",
    "Usado como combustível e fonte de energia em várias indústrias"
  ]
}'
```

### Estrutura Esperada para Cadastro de Molécula

- **name**: Nome da molécula (exemplo: `"Metano"`).
- **formula**: Fórmula química (exemplo: `"CH4"`).
- **hints**: Lista de dicas sobre a molécula, facilitando a adivinhação pelos jogadores.

## Funcionalidades de Autenticação e Sessão

- **Registro e Login**: 
  - Os usuários podem se registrar e fazer login.
  - O sistema de autenticação usa JWT para garantir a segurança das sessões.

- **Controle de Sessão**:
  - O backend mantém o controle das tentativas e acertos dos jogadores.
  - Os jogadores não perdem as tentativas já realizadas, mesmo que se desconectem ou retornem ao jogo em outro momento.

- **Pontuação e Ranking**:
  - O sistema permite visualizar o ranking global dos jogadores com base nos acertos.

## Estrutura de Pastas e Componentes

- **backend/**: Código fonte do backend, configurado com NestJS e MongoDB.
- **frontend/**: Código fonte do frontend, configurado com Next.js para exibir as moléculas e o progresso dos jogadores.
