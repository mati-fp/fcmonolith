#!/bin/sh

# Instalar as dependências
npm install

# Atualizar os pacotes para a versão mais nova compatível
npm update

#Atualizar o npm para a versão mais nova compatível
npm install -g npm@11.1.0

# Manter o container em execução
tail -f /dev/null
