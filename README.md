# Avito Clone - Тестовое задание для стажёра Frontend

## 🚀 Запуск проекта

### Локальный запуск проекта

1. **Установите зависимости для сервера:**

```bash
cd server
npm install
```

2. **Запустите сервер:**

```bash
npm start
```

3. **Установите зависимости для клиента:**

```bash
cd ../client
npm install
```

4. **Запустите клиент:**

```bash
npm run dev
```

### Docker-развертывание

1. **Соберите и запустите контейнеры:**

```bash
docker-compose up --build
```

2. **Приложение будет доступно:**

- Клиент: `http://localhost:5173`
- Сервер: `http://localhost:3000`

## 📌 Техническое задание

### Основные требования

- React 18+ с TypeScript
- Роутинг через react-router-dom
- Серверная часть из папки `server`
- Три категории объявлений: недвижимость, авто, услуги
- Многошаговая форма с валидацией
- Пагинация, поиск и фильтрация
- Сохранение черновиков

### Маршруты

- `/form` - Создание/редактирование объявлений
- `/list` - Список объявлений (5 на странице)
- `/item/:id` - Детализация объявления

## 🛠 Выбор технологий

### Обязательные:

- **React + TypeScript** - Базовый стек для разработки
- **react-router-dom** - Навигация между страницами

### Дополнительные:

1. **Redux Toolkit**

   - Управление состоянием приложения (формы, фильтры)

2. **Material UI**

   - Готовые адаптивные компоненты
   - Ускорение разработки интерфейсов
   - Встроенная accessibility

3. **Vite**

   - Молниеносная сборка проекта
   - Горячая перезагрузка модулей
   - Оптимизация production-сборки

4. **React Query + Axios**

   - Кеширование API-запросов
   - Автоматический retry при ошибках
   - Интеграция с Redux через middleware

5. **Yup + react-hook-form**
   - Декларативная валидация форм
   - Интеграция с Material UI

### Оптимизации

- Дебаунс для поиска и фильтров

---
