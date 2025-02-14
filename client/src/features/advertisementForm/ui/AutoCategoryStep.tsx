import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { FormData } from "../model/types";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { DEFAULT_VALUES } from "../config/config";
import { CarBrand } from "../../../shared/types/advertesementTypes";
interface AutoCategoryStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  formData: FormData;
}
const AutoCategoryStep: React.FC<AutoCategoryStepProps> = ({
  register,
  errors,
  formData,
}) => {
  // const dispatch = useDispatch();
  // const handleChange = (key: keyof FormData, value: string | number) => {
  //   dispatch(updateFormData({ [key]: value }));
  // };
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Brand"
        {...register("brand")}
        defaultValue={formData.brand || DEFAULT_VALUES.brand}
        error={!!errors.brand}
        helperText={errors.brand?.message}
        required
        select
        sx={{ mb: 2 }}
      >
        <MenuItem value={CarBrand.HONDA}>Honda</MenuItem>
        <MenuItem value={CarBrand.TOYOTA}>Toyota</MenuItem>
        <MenuItem value={CarBrand.MAZDA}>Mazda</MenuItem>
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
