import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { RealEstateData } from "../../../shared/types/types";
import { useFormContext } from "react-hook-form";
import { PROPERTY_TYPES } from "../../../shared/constants/advertisementsFieldTypes";

interface RealEstateCategoryStepProps {
  formData: Partial<RealEstateData>;
}
const RealEstateCategoryStep: React.FC<RealEstateCategoryStepProps> = ({
  formData,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RealEstateData>();
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Тип недвижимости"
        {...register("propertyType")}
        // defaultValue={formData.propertyType || "house"}
        defaultValue={formData.propertyType ?? ""}
        error={!!errors.name}
        helperText={errors.name?.message}
        required
        select
        sx={{ mb: 2 }}
      >
        {Object.values(PROPERTY_TYPES).map((brand) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Площадь (м²)"
        {...register("area")}
        error={!!errors.area}
        helperText={errors.area?.message}
        required
        type="number"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Количество комнат"
        {...register("rooms")}
        error={!!errors.rooms}
        helperText={errors.rooms?.message}
        required
        type="number"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Цена"
        {...register("price")}
        error={!!errors.price}
        helperText={errors.price?.message}
        required
        type="number"
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default RealEstateCategoryStep;
