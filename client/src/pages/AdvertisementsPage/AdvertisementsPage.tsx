// features/AdvertisementList/AdvertisementList.tsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Select,
  MenuItem,
  Pagination,
  Button,
  Box,
  CircularProgress,
  Alert,
  InputAdornment,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  AdvertisementType,
  CarBrand,
  PropertyType,
  ServiceType,
} from "../../shared/types/advertesementTypes";
import { api } from "./client";

const PAGE_SIZE = 5;

// Типы для фильтров
interface CategoryFilters {
  realEstate: {
    minArea: string;
    maxArea: string;
    minRooms: string;
    maxRooms: string;
    minPrice: string;
    maxPrice: string;
  };
  auto: {
    minYear: string;
    maxYear: string;
    minMileage: string;
    maxMileage: string;
  };
  services: {
    minExperience: string;
    maxExperience: string;
    minCost: string;
    maxCost: string;
  };
}

export const AdvertisementsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Объявления
      </Typography>
      <AdvertisementList />
    </Box>
  );
};

const AdvertisementList = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    AdvertisementType | "all"
  >("all");
  const [selectedSubFilter, setSelectedSubFilter] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<CategoryFilters>({
    realEstate: {
      minArea: "",
      maxArea: "",
      minRooms: "",
      maxRooms: "",
      minPrice: "",
      maxPrice: "",
    },
    auto: {
      minYear: "",
      maxYear: "",
      minMileage: "",
      maxMileage: "",
    },
    services: {
      minExperience: "",
      maxExperience: "",
      minCost: "",
      maxCost: "",
    },
  });
  const {
    data: advertisements = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["advertisements"],
    queryFn: () => api.get("/items").then((res) => res.data),
  });

  const filteredAdvertisements = useMemo(() => {
    let filtered = advertisements;
    console.log(filtered);

    // Общий поиск
    if (searchQuery) {
      filtered = filtered.filter((ad) =>
        ad.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по категории
    if (selectedCategory !== "all") {
      filtered = filtered.filter((ad) => ad.type === selectedCategory);
    }

    // Фильтр по подкатегории
    if (selectedSubFilter) {
      filtered = filtered.filter((ad) => {
        switch (selectedCategory) {
          case AdvertisementType.REAL_ESTATE:
            return ad.propertyType === selectedSubFilter;
          case AdvertisementType.AUTO:
            return ad.brand === selectedSubFilter;
          case AdvertisementType.SERVICES:
            return ad.serviceType === selectedSubFilter;
          default:
            return true;
        }
      });
    }

    // Расширенные фильтры
    filtered = filtered.filter((ad) => {
      switch (ad.type) {
        case AdvertisementType.REAL_ESTATE:
          return (
            (filters.realEstate.minArea === "" ||
              ad.area >= Number(filters.realEstate.minArea)) &&
            (filters.realEstate.maxArea === "" ||
              ad.area <= Number(filters.realEstate.maxArea)) &&
            (filters.realEstate.minRooms === "" ||
              ad.rooms >= Number(filters.realEstate.minRooms)) &&
            (filters.realEstate.maxRooms === "" ||
              ad.rooms <= Number(filters.realEstate.maxRooms)) &&
            (filters.realEstate.minPrice === "" ||
              ad.price >= Number(filters.realEstate.minPrice)) &&
            (filters.realEstate.maxPrice === "" ||
              ad.price <= Number(filters.realEstate.maxPrice))
          );
        case AdvertisementType.AUTO:
          return (
            (filters.auto.minYear === "" ||
              ad.year >= Number(filters.auto.minYear)) &&
            (filters.auto.maxYear === "" ||
              ad.year <= Number(filters.auto.maxYear)) &&
            (filters.auto.minMileage === "" ||
              (ad.mileage ?? 0) >= Number(filters.auto.minMileage)) &&
            (filters.auto.maxMileage === "" ||
              (ad.mileage ?? 0) <= Number(filters.auto.maxMileage))
          );
        case AdvertisementType.SERVICES:
          return (
            (filters.services.minExperience === "" ||
              ad.experience >= Number(filters.services.minExperience)) &&
            (filters.services.maxExperience === "" ||
              ad.experience <= Number(filters.services.maxExperience)) &&
            (filters.services.minCost === "" ||
              ad.cost >= Number(filters.services.minCost)) &&
            (filters.services.maxCost === "" ||
              ad.cost <= Number(filters.services.maxCost))
          );
        default:
          return true;
      }
    });

    return filtered;
  }, [
    advertisements,
    searchQuery,
    selectedCategory,
    selectedSubFilter,
    filters,
  ]);
  const handleFilterChange = (
    category: keyof CategoryFilters,
    field: string,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
    setPage(1);
  };
  const paginatedAdvertisements = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAdvertisements.slice(start, start + PAGE_SIZE);
  }, [filteredAdvertisements, page]);

  const handleCategoryChange = (category: AdvertisementType | "all") => {
    setSelectedCategory(category);
    setSelectedSubFilter("");
    setPage(1);
  };
  const renderAdvancedFilters = () => {
    switch (selectedCategory) {
      case AdvertisementType.REAL_ESTATE:
        return (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Минимальная площадь"
              type="number"
              value={filters.realEstate.minArea}
              onChange={(e) =>
                handleFilterChange("realEstate", "minArea", e.target.value)
              }
              sx={{ width: 180 }}
            />
            <TextField
              label="Максимальная площадь"
              type="number"
              value={filters.realEstate.maxArea}
              onChange={(e) =>
                handleFilterChange("realEstate", "maxArea", e.target.value)
              }
              sx={{ width: 180 }}
            />
            <TextField
              label="Минимальное комнат"
              type="number"
              value={filters.realEstate.minRooms}
              onChange={(e) =>
                handleFilterChange("realEstate", "minRooms", e.target.value)
              }
              sx={{ width: 180 }}
            />
            <TextField
              label="Максимальное комнат"
              type="number"
              value={filters.realEstate.maxRooms}
              onChange={(e) =>
                handleFilterChange("realEstate", "maxRooms", e.target.value)
              }
              sx={{ width: 180 }}
            />
            <TextField
              label="Минимальная цена"
              type="number"
              value={filters.realEstate.minPrice}
              onChange={(e) =>
                handleFilterChange("realEstate", "minPrice", e.target.value)
              }
              sx={{ width: 180 }}
            />
            <TextField
              label="Максимальная цена"
              type="number"
              value={filters.realEstate.maxPrice}
              onChange={(e) =>
                handleFilterChange("realEstate", "maxPrice", e.target.value)
              }
              sx={{ width: 180 }}
            />
          </Box>
        );
      case AdvertisementType.AUTO:
        return (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Год от"
              type="number"
              value={filters.auto.minYear}
              onChange={(e) =>
                handleFilterChange("auto", "minYear", e.target.value)
              }
              sx={{ width: 120 }}
            />
            <TextField
              label="Год до"
              type="number"
              value={filters.auto.maxYear}
              onChange={(e) =>
                handleFilterChange("auto", "maxYear", e.target.value)
              }
              sx={{ width: 120 }}
            />
            <TextField
              label="Пробег от"
              type="number"
              value={filters.auto.minMileage}
              onChange={(e) =>
                handleFilterChange("auto", "minMileage", e.target.value)
              }
              sx={{ width: 140 }}
            />
            <TextField
              label="Пробег до"
              type="number"
              value={filters.auto.maxMileage}
              onChange={(e) =>
                handleFilterChange("auto", "maxMileage", e.target.value)
              }
              sx={{ width: 140 }}
            />
          </Box>
        );
      case AdvertisementType.SERVICES:
        return (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Опыт от (лет)"
              type="number"
              value={filters.services.minExperience}
              onChange={(e) =>
                handleFilterChange("services", "minExperience", e.target.value)
              }
              sx={{ width: 160 }}
            />
            <TextField
              label="Опыт до (лет)"
              type="number"
              value={filters.services.maxExperience}
              onChange={(e) =>
                handleFilterChange("services", "maxExperience", e.target.value)
              }
              sx={{ width: 160 }}
            />
            <TextField
              label="Стоимость от"
              type="number"
              value={filters.services.minCost}
              onChange={(e) =>
                handleFilterChange("services", "minCost", e.target.value)
              }
              sx={{ width: 160 }}
            />
            <TextField
              label="Стоимость до"
              type="number"
              value={filters.services.maxCost}
              onChange={(e) =>
                handleFilterChange("services", "maxCost", e.target.value)
              }
              sx={{ width: 160 }}
            />
          </Box>
        );
      default:
        return null;
    }
  };
  const getSubFilters = () => {
    switch (selectedCategory) {
      case AdvertisementType.REAL_ESTATE:
        return Object.values(PropertyType);
      case AdvertisementType.AUTO:
        return Object.values(CarBrand);
      case AdvertisementType.SERVICES:
        return Object.values(ServiceType);
      default:
        return [];
    }
  };

  if (isLoading) return <CircularProgress sx={{ mt: 4 }} />;
  if (isError)
    return <Alert severity="error">Ошибка загрузки объявлений</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          variant="outlined"
          placeholder="Поиск по названию"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />

        <Select
          value={selectedCategory}
          onChange={(e) =>
            handleCategoryChange(e.target.value as AdvertisementType | "all")
          }
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">Все категории</MenuItem>
          {Object.values(AdvertisementType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>

        {selectedCategory !== "all" && (
          <Select
            value={selectedSubFilter}
            onChange={(e) => setSelectedSubFilter(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">Все {selectedCategory}</MenuItem>
            {getSubFilters().map((filter) => (
              <MenuItem key={filter} value={filter}>
                {filter}
              </MenuItem>
            ))}
          </Select>
        )}
        {selectedCategory !== "all" && (
          <>
            <Button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              endIcon={
                showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              sx={{ ml: 2 }}
            >
              Расширенные фильтры
            </Button>
            <Collapse
              in={showAdvancedFilters && selectedCategory !== "all"}
              unmountOnExit
            >
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                }}
              >
                {renderAdvancedFilters()}
              </Box>
            </Collapse>
          </>
        )}

        <Button
          variant="contained"
          component={Link}
          to="/form"
          sx={{ ml: "auto" }}
        >
          Разместить объявление
        </Button>
      </Box>

      <Grid container spacing={3}>
        {paginatedAdvertisements.map((ad) => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={ad.photo || "/placeholder.png"}
                alt={ad.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {ad.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ad.location}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Категория: {ad.type}
                </Typography>
              </CardContent>
              <Button
                component={Link}
                to={`/item/${ad.id}`}
                size="small"
                sx={{ m: 1 }}
              >
                Подробнее
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredAdvertisements.length > 0 && (
        <Pagination
          count={Math.ceil(filteredAdvertisements.length / PAGE_SIZE)}
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        />
      )}

      {filteredAdvertisements.length === 0 && (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
          Объявления не найдены
        </Typography>
      )}
    </Box>
  );
};
