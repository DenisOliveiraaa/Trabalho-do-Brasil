# Use a imagem oficial do Node.js como base
FROM node:14

# Crie e defina o diretório de trabalho da aplicação
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "index.js"]
