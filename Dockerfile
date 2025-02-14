# Usar a imagem base do Node.js
FROM node:lts-alpine3.20

# Instalar o SQLite e suas dependências
RUN apk add --no-cache sqlite sqlite-dev

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Copiar o script de setup
COPY setup.sh ./

# Dar permissão de execução ao script
RUN chmod +x setup.sh

# Copiar o restante do código da aplicação
COPY . .

# Ajustar permissões do diretório .npm
# RUN mkdir -p /root/.npm && chown -R root:root /root/.npm && chmod -R 777 /root/.npm

# Expor a porta que a aplicação usa (ajuste se necessário)
EXPOSE 3000

# Comando para executar o script de setup ao iniciar o container
ENTRYPOINT [ "./setup.sh" ]
