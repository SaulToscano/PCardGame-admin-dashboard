# Etapa 1: Construcción
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Compilamos Angular para producción
RUN npm run build --configuration=production

# Etapa 2: Servidor
FROM nginx:alpine
# Copiamos nuestra configuración especial para Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf
# ATENCIÓN: Cambia "PCardGame-admin-dashboard" por el nombre exacto de la carpeta que se genera dentro de /dist/
COPY --from=build /app/dist/admin-dashboard/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]