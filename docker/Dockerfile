# Primera etapa: Construcción del proyecto
FROM node:20-alpine AS builder

ARG VITE_KEYCLOAK_URL
ARG VITE_REALM
ARG VITE_CLIENT_ID
ARG VITE_PORT

ENV VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL
ENV VITE_REALM=$VITE_REALM
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
ENV VITE_PORT=$VITE_PORT

WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./

RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación de React
RUN npm run build

FROM nginx:alpine AS server
LABEL authors="agrubio"

# instalamos los requeriments necesarios
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/docker/default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto por el que Nginx va a servir los archivos
EXPOSE 80

# Iniciar Nginx para servir los archivos estáticos
CMD ["nginx", "-g", "daemon off;"]