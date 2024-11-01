# Usar a imagem oficial do Node.js
FROM node:20

# Criar o diretório de trabalho no container
WORKDIR /usr/src/app

# Instalar o NestJS CLI globalmente
RUN npm install -g @nestjs/cli

# Copiar o package.json e o package-lock.json para o container
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o código para o container
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["sh", "-c", "npm install && npm run start:dev"]
