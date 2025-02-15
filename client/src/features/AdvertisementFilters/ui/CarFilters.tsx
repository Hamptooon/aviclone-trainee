import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { CAR_BRANDS } from "../../../shared/constants/advertisementsFieldTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { setFilters } from "../model/filterSlice";

export const CarFilters: React.FC = () => {
  const { filters } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const handleFilterChange = (name: string, value: string | number) => {
    dispatch(setFilters({ [name]: value }));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Марка авто</InputLabel>
          <Select
            value={filters.brand || ""}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
          >
            {Object.values(CAR_BRANDS).map((brand) => (
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
          onChange={(e) => handleFilterChange("minYear", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Год выпуска до"
          type="number"
          value={filters.maxYear || ""}
          onChange={(e) => handleFilterChange("maxYear", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Модель"
          value={filters.model || ""}
          onChange={(e) => handleFilterChange("model", e.target.value)}
        />
      </Grid>
    </Grid>
  );
};
