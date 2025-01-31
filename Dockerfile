# Usar a imagem base do Node.js
FROM node:14-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Copiar o script de setup
COPY setup.sh ./

# Dar permissão de execução ao script
RUN chmod +x setup.sh

# Expor a porta que a aplicação usa (ajuste se necessário)
EXPOSE 3000

# Comando para executar o script de setup ao iniciar o container
ENTRYPOINT [ "./setup.sh" ]
