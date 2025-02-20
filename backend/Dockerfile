# backend/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p uploads
EXPOSE 5000

CMD ["npm", "run", "start:prod"]