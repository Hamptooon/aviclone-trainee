import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { AutoData } from "../../../shared/types/types";
import { useFormContext } from "react-hook-form";
import { DEFAULT_VALUES } from "../config/config";
import { CAR_BRANDS } from "../../../shared/constants/advertisementsFieldTypes";
interface AutoCategoryStepProps {
  formData: Partial<AutoData>;
}
const AutoCategoryStep: React.FC<AutoCategoryStepProps> = ({ formData }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AutoData>();
  console.log("brand", formData.brand);
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Brand"
        {...register("brand")}
        defaultValue={formData.brand ?? ""}
        error={!!errors.brand}
        helperText={errors.brand?.message}
        required
        select
        sx={{ mb: 2 }}
      >
        {Object.values(CAR_BRANDS).map((brand) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="Model"
        {...register("model")}
        error={!!errors.model}
        helperText={errors.model?.message}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Year"
        {...register("year")}
        error={!!errors.year}
        helperText={errors.year?.message}
        required
        type="number"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Mileage"
        {...register("mileage")}
        error={!!errors.mileage}
        helperText={errors.mileage?.message}
        type="number"
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default AutoCategoryStep;
