import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { PROPERTY_TYPES } from "../../../shared/constants/advertisementsFieldTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { setFilters } from "../model/filterSlice";

export const RealEstateFilters: React.FC = () => {
  const { filters } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const handleFilterChange = (name: string, value: string | number) => {
    dispatch(setFilters({ [name]: value }));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Тип недвижимости</InputLabel>
          <Select
            value={filters.propertyType || ""}
            onChange={(e) => handleFilterChange("propertyType", e.target.value)}
          >
            {Object.values(PROPERTY_TYPES).map((type) => (
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
          onChange={(e) => handleFilterChange("minArea", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Макс. площадь"
          type="number"
          value={filters.maxArea || ""}
          onChange={(e) => handleFilterChange("maxArea", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Мин. цена"
          type="number"
          value={filters.minPrice || ""}
          onChange={(e) => handleFilterChange("minPrice", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Макс. цена"
          type="number"
          value={filters.maxPrice || ""}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Мин. комнат"
          type="number"
          value={filters.minRooms || ""}
          onChange={(e) => handleFilterChange("minRooms", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Макс. комнат"
          type="number"
          value={filters.maxRooms || ""}
          onChange={(e) => handleFilterChange("maxRooms", e.target.value)}
        />
      </Grid>
    </Grid>
  );
};
