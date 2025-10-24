# Usa uma imagem base Node.js LTS
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de definição de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que o Express usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "run", "dev" ]

