# Define a imagem base
FROM node:20.12.2-alpine3.19

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de requisitos para o diretório de trabalho
COPY package.json .

# Instala as dependências do projeto
RUN npm install

# Copia os arquivos de requisitos para o diretório de trabalho
COPY . .

# Libera a porta desejada
EXPOSE 5173

# Define o comando de execução do frontend
CMD ["npm", "run", "dev", "--", "--host"]