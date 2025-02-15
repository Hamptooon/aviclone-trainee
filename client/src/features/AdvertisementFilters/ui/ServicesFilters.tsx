import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { SERVICE_TYPES } from "../../../shared/constants/advertisementsFieldTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { setFilters } from "../model/filterSlice";

export const ServicesFilters: React.FC = () => {
  const { filters } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const handleFilterChange = (name: string, value: string | number) => {
    dispatch(setFilters({ [name]: value }));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Тип услуги</InputLabel>
          <Select
            value={filters.serviceType || ""}
            onChange={(e) => handleFilterChange("serviceType", e.target.value)}
          >
            {Object.values(SERVICE_TYPES).map((service) => (
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
          onChange={(e) => handleFilterChange("minExperience", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Мин. стоимость"
          type="number"
          value={filters.minCost || ""}
          onChange={(e) => handleFilterChange("minCost", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Макс. стоимость"
          type="number"
          value={filters.maxCost || ""}
          onChange={(e) => handleFilterChange("maxCost", e.target.value)}
        />
      </Grid>
    </Grid>
  );
};
