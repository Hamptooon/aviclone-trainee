import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { FormData } from "../../../shared/types/types";

import { useFormContext } from "react-hook-form";
import { ADVERTISEMENT_TYPES } from "../../../shared/constants/advertisementsFieldTypes";

const BasicStep = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormData>();
  const typeValue = watch("type");
  const name = watch("name");
  const description = watch("description");
  const location = watch("location");
  const photo = watch("photo");
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Название"
        {...register("name")}
        value={name || ""}
        error={!!errors.name}
        helperText={errors.name?.message}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Описание"
        {...register("description")}
        value={description || ""}
        error={!!errors.description}
        helperText={errors.description?.message}
        required
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Местоположение"
        {...register("location")}
        value={location || ""}
        error={!!errors.location}
        helperText={errors.location?.message}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="URL изображения"
        {...register("photo")}
        value={photo || ""}
        error={!!errors.photo}
        helperText={errors.photo?.message}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Категория"
        {...register("type")}
        value={typeValue || ADVERTISEMENT_TYPES.realEstate}
        error={!!errors.type}
        helperText={errors.type?.message}
        required
        select
        sx={{ mb: 2 }}
      >
        <MenuItem value={ADVERTISEMENT_TYPES.realEstate}>Недвижимость</MenuItem>
        <MenuItem value={ADVERTISEMENT_TYPES.auto}>Авто</MenuItem>
        <MenuItem value={ADVERTISEMENT_TYPES.services}>Услуги</MenuItem>
      </TextField>
    </Box>
  );
};

export default BasicStep;
