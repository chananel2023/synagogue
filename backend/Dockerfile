# Dockerfile בסיסי ל־Node.js backend

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5007

CMD ["npm", "start"]
