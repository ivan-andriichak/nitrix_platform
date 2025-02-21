FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["sh", "-c", "npm run build && vite build --watch"]