# frontend/Dockerfile
FROM node:20 AS builder

# Встановлення робочої директорії
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів
COPY . .

# Збираємо проект
RUN npm run build

# Використовуємо nginx для сервісу зібраних файлів
FROM nginx:alpine

# Копіюємо зібрані файли до nginx сервера
COPY --from=builder /app/dist /usr/share/nginx/html

# Відкриваємо порт 3000
EXPOSE 3000

# Команда для запуску nginx
CMD ["nginx", "-g", "daemon off;"]