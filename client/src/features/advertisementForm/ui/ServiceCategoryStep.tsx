import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { ServicesData } from "../../../shared/types/types";
import { useFormContext } from "react-hook-form";
import { SERVICE_TYPES } from "../../../shared/constants/advertisementsFieldTypes";
interface ServiceCategoryStepProps {
  formData: Partial<ServicesData>;
}
const ServiceCategoryStep: React.FC<ServiceCategoryStepProps> = ({
  formData,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ServicesData>();
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Тип услуги"
        {...register("serviceType")}
        defaultValue={formData.serviceType ?? ""}
        error={!!errors.serviceType}
        helperText={errors.serviceType?.message}
        required
        select
        sx={{ mb: 2 }}
      >
        {Object.values(SERVICE_TYPES).map((brand) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="Опыт (лет)"
        {...register("experience")}
        error={!!errors.experience}
        helperText={errors.experience?.message}
        required
        type="number"
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
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Образование"
        {...register("schedule")}
        error={!!errors.schedule}
        helperText={errors.schedule?.message}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default ServiceCategoryStep;
