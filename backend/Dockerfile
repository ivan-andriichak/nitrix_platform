FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

# Встановлюємо nodemon глобально для автоматичного перезапуску
RUN npm install -g nodemon

COPY . .

RUN npm run build

EXPOSE 5000

# Запускаємо бекенд у режимі розробки через nodemon
CMD ["npm", "run", "start:dev"]

