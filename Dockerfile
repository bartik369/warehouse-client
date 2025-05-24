# Этап 1: Сборка проекта
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Этап 2: Используем NGINX для сервировки
FROM nginx:stable-alpine

# Удаляем дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf

# Копируем кастомный конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранный Vite-проект
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
