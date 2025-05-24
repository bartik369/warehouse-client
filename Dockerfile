# Этап 1: Сборка проекта
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Этап 2: Запуск через "serve"
FROM node:20-alpine

WORKDIR /app

# Устанавливаем легкий http-сервер
RUN npm install -g serve

# Копируем собранный проект
COPY --from=builder /app/dist .

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
