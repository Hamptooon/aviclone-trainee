import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import {
  AdvertisementType,
  PropertyType,
  CarBrand,
  ServiceType,
} from "../../../shared/types/advertesementTypes";
import { useDebounce } from "../../../shared/lib/hooks/useDebounce";
import { AdvertisementFiltersType } from "../../../shared/api/advertisementApi";
interface AdvertisementFiltersProps {
  onFilterChange: (filters: any) => void;
  resetTrigger: boolean; // Добавляем пропс для сброса
}

export const AdvertisementFilters = ({
  onFilterChange,
  resetTrigger,
}: AdvertisementFiltersProps) => {
  const debounceDelay = 500;
  const [type, setType] = useState<AdvertisementType | "">("");
  const [filters, setFilters] = useState<AdvertisementFiltersType>({});
  const debouncedFilters = useDebounce(filters, debounceDelay);
  useEffect(() => {
    setType("");
    setFilters({});
    onFilterChange({});
  }, [resetTrigger]);
  useEffect(() => {
    onFilterChange({ type: type || undefined, ...debouncedFilters });
  }, [type, debouncedFilters]);

  const handleTypeChange = (newType: AdvertisementType | "") => {
    setType(newType);
    setFilters({}); // Сбрасываем дополнительные фильтры при смене типа
  };

  const renderAdditionalFilters = () => {
    switch (type) {
      case AdvertisementType.REAL_ESTATE:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Тип недвижимости</InputLabel>
                <Select
                  value={filters.propertyType || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, propertyType: e.target.value })
                  }
                >
                  {Object.values(PropertyType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Мин. площадь"
                type="number"
                value={filters.minArea || ""}
                onChange={(e) =>
                  setFilters({ ...filters, minArea: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Макс. площадь"
                type="number"
                value={filters.maxArea || ""}
                onChange={(e) =>
                  setFilters({ ...filters, maxArea: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Мин. цена"
                type="number"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Макс. цена"
                type="number"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Мин. комнат"
                type="number"
                value={filters.minRooms || ""}
                onChange={(e) =>
                  setFilters({ ...filters, minRooms: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Макс. комнат"
                type="number"
                value={filters.maxRooms || ""}
                onChange={(e) =>
                  setFilters({ ...filters, maxRooms: e.target.value })
                }
              />
            </Grid>
          </Grid>
        );

      case AdvertisementType.AUTO:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Марка авто</InputLabel>
                <Select
                  value={filters.brand || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, brand: e.target.value })
                  }
                >
                  {Object.values(CarBrand).map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Год выпуска от"
                type="number"
                value={filters.minYear || ""}
                onChange={(e) =>
                  setFilters({ ...filters, minYear: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Год выпуска до"
                type="number"
                value={filters.maxYear || ""}
                onChange={(e) =>
                  setFilters({ ...filters, maxYear: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Модель"
                value={filters.model || ""}
                onChange={(e) =>
                  setFilters({ ...filters, model: e.target.value })
                }
              />
            </Grid>
          </Grid>
        );

      case AdvertisementType.SERVICES:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Тип услуги</InputLabel>
                <Select
                  value={filters.serviceType || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, serviceType: e.target.value })
                  }
                >
                  {Object.values(ServiceType).map((service) => (
                    <MenuItem key={service} value={service}>
                      {service}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Опыт от (лет)"
                type="number"
                value={filters.minExperience || ""}
                onChange={(e) =>
                  setFilters({ ...filters, minExperience: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Мин. стоимость"
                type="number"
                value={filters.minCost || ""}
                onChange={(e) =>
                  setFilters({ ...filters, minCost: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Макс. стоимость"
                type="number"
                value={filters.maxCost || ""}
                onChange={(e) =>
                  setFilters({ ...filters, maxCost: e.target.value })
                }
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Категория</InputLabel>
        <Select
          value={type}
          onChange={(e) =>
            handleTypeChange(e.target.value as AdvertisementType | "")
          }
        >
          <MenuItem value="">Все категории</MenuItem>
          {Object.values(AdvertisementType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {type && renderAdditionalFilters()}
    </Box>
  );
};
