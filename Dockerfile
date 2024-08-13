
FROM node:latest

#Diretório de trabalho
WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN npm i

# Compila a aplicação
RUN npm run build

# Use uma imagem base Nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos compilados para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 4200

CMD ["npm", "start"]