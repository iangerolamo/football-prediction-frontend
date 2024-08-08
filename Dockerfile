# Stage 1: Build the Angular application
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copia o arquivo de configuração do Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos construídos para o diretório padrão do Nginx
COPY --from=build /app/dist/football-prediction-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
