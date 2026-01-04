# Сборка
FROM node:20-alpine AS builder

# Включаем Corepack для Yarn 4
RUN corepack enable

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json yarn.lock ./
COPY .yarnrc.yml* ./

# Копируем кэш Yarn если есть (опционально)
COPY .yarn/ .yarn/

# Устанавливаем Yarn 4 и зависимости
RUN corepack prepare yarn@4.12.0 --activate && \
    yarn install --immutable

# Копируем исходный код
COPY . .

# Переменные окружения для сборки
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Собираем приложение
RUN yarn run build

# Продакшен-сервер (на базе nginx)
FROM nginx:stable-alpine

# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранное приложение
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]