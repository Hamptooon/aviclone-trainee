import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { FormData } from "../model/types";
import { updateFormData } from "../model/formSlice";
import { useDispatch } from "react-redux";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { DEFAULT_VALUES } from "../config/config";
import { ServiceType } from "../../../shared/types/advertesementTypes";
interface ServiceCategoryStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  formData: FormData;
}
const ServiceCategoryStep: React.FC<ServiceCategoryStepProps> = ({
  register,
  errors,
  formData,
}) => {
  const dispatch = useDispatch();
  const handleChange = (key: keyof FormData, value: string | number) => {
    dispatch(updateFormData({ [key]: value }));
  };
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Тип услуги"
        {...register("serviceType")}
        defaultValue={formData.serviceType || DEFAULT_VALUES.serviceType}
        error={!!errors.serviceType}
        helperText={errors.serviceType?.message}
        required
        select
        onChange={(e) => handleChange("serviceType", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value={ServiceType.REPAIR}>Ремонт</MenuItem>
        <MenuItem value={ServiceType.CLEANING}>Уборка</MenuItem>
        <MenuItem value={ServiceType.DELIVERY}>Доставка</MenuItem>
      </TextField>
      <TextField
        fullWidth
        label="Опыт (лет)"
        {...register("experience")}
        error={!!errors.experience}
        helperText={errors.experience?.message}
        required
        type="number"
        onChange={(e) => handleChange("experience", e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Цена"
        {...register("cost")}
        error={!!errors.cost}
        helperText={errors.cost?.message}
        required
        type="number"
        onChange={(e) => handleChange("cost", e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Образование"
        {...register("schedule")}
        error={!!errors.schedule}
        helperText={errors.schedule?.message}
        onChange={(e) => handleChange("schedule", e.target.value)}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default ServiceCategoryStep;
