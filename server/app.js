const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const ItemTypes = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

const app = express();
app.use(bodyParser.json());
app.use(cors());
// In-memory хранилище для объявлений
let items = [];

const makeCounter = () => {
  let count = 0;
  return () => count++;
};

const itemsIdCounter = makeCounter();

// Создание нового объявления
app.post("/items", (req, res) => {
  const { name, description, location, type, ...rest } = req.body;

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: "Missing required common fields" });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Real estate" });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Auto" });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Services" });
      }
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    ...rest,
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get("/items", (req, res) => {
  const {
    page = 1,
    limit = 5,
    search = "",
    type, // Добавляем type из query параметров
    // Добавляем параметры для дополнительных фильтров
    propertyType,
    minArea,
    maxArea,
    minRooms,
    maxRooms,
    minPrice,
    maxPrice,
    brand,
    model,
    minYear,
    maxYear,
    serviceType,
    minExperience,
    minCost,
    maxCost,
  } = req.query;

  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  let filteredItems = items.filter((item) => {
    let match = true;

    // Фильтр по поиску
    if (search) {
      match =
        match &&
        item.name.toLowerCase().includes(search.toString().toLowerCase());
    }

    // Фильтр по типу объявления
    if (type) {
      match = match && item.type === type;
    }

    // Дополнительные фильтры для недвижимости
    if (type === ItemTypes.REAL_ESTATE) {
      if (propertyType) match = match && item.propertyType === propertyType;
      if (minArea) match = match && item.area >= parseInt(minArea);
      if (maxArea) match = match && item.area <= parseInt(maxArea);
      if (minRooms) match = match && item.rooms >= parseInt(minRooms);
      if (maxRooms) match = match && item.rooms <= parseInt(maxRooms);
      if (minPrice) match = match && item.price >= parseInt(minPrice);
      if (maxPrice) match = match && item.price <= parseInt(maxPrice);
    }

    // Дополнительные фильтры для авто
    if (type === ItemTypes.AUTO) {
      if (brand) match = match && item.brand === brand;
      if (minYear) match = match && item.year >= parseInt(minYear);
      if (maxYear) match = match && item.year <= parseInt(maxYear);
      if (model)
        match =
          match &&
          item.model.toLowerCase().includes(model.toString().toLowerCase());
    }

    // Дополнительные фильтры для услуг
    if (type === ItemTypes.SERVICES) {
      if (serviceType) match = match && item.serviceType === serviceType;
      if (minExperience)
        match = match && item.experience >= parseInt(minExperience);
      if (minCost) match = match && item.cost >= parseInt(minCost);
      if (maxCost) match = match && item.cost <= parseInt(maxCost);
    }

    return match;
  });

  // Пагинация
  const startIndex = (parsedPage - 1) * parsedLimit;
  const endIndex = parsedPage * parsedLimit;

  const results = {
    total: filteredItems.length,
    data: filteredItems.slice(startIndex, endIndex),
    page: parsedPage,
    totalPages: Math.ceil(filteredItems.length / parsedLimit),
    search: search.toString(),
  };

  res.json(results);
});

// Получение объявления по его id
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Обновление объявления по его id
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Удаление объявления по его id
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.id, 10)
  );
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Item not found");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
