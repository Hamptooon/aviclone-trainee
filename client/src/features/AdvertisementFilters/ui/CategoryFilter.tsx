import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ADVERTISEMENT_TYPES } from "../../../shared/constants/advertisementsFieldTypes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store/store";
import { setType } from "../model/filterSlice";

export const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch();
  const handleTypeChange = (newType: string) => {
    dispatch(setType(newType));
  };
  const { type } = useSelector((state: RootState) => state.filters);
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Категория</InputLabel>
      <Select value={type} onChange={(e) => handleTypeChange(e.target.value)}>
        <MenuItem value="">Все категории</MenuItem>
        {Object.values(ADVERTISEMENT_TYPES).map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
