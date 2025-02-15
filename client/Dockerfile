# client/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Изменяем на правильный порт Vite
EXPOSE 5173

# Добавляем --host для доступа извне контейнера
CMD ["npm", "run", "dev", "--", "--host"]