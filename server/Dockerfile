FROM node:20

WORKDIR /app

# Копируем только package.json и package-lock.json сначала
COPY package.json .

# Устанавливаем зависимости
RUN npm install

# Затем копируем остальные файлы
COPY . .


EXPOSE 3000

CMD ["npm", "start"]