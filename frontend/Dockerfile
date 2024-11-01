# Usar a imagem oficial do Node.js
FROM node:20

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar o package.json e o package-lock.json para o container
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todo o código para o container
COPY . .

# Expor a porta 3000 para o servidor Next.js
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
