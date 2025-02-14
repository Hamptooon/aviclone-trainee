// import React from "react";
// import FormField from "./FormField";
// import { Box } from "@mui/material";
// import { RealEstateFormData } from "../model/types";
// import { updateFormData } from "../model/formSlice";
// import { useDispatch } from "react-redux";
// const RealEstateCategoryStep = ({
//   formData,
// }: {
//   formData: RealEstateFormData;
// }) => {
//   const dispatch = useDispatch();
//   const handleChange = (
//     key: keyof RealEstateFormData,
//     value: string | number
//   ) => {
//     dispatch(updateFormData({ [key]: value }));
//   };
//   return (
//     <Box sx={{ mt: 2 }}>
//       <FormField<RealEstateFormData>
//         label="Property Type"
//         value={formData.propertyType}
//         required
//         select
//         fieldKey="propertyType"
//         options={[
//           { value: "apartment", label: "Apartment" },
//           { value: "house", label: "House" },
//           { value: "cottage", label: "Cottage" },
//         ]}
//         onChange={handleChange}
//       />
//       <FormField<RealEstateFormData>
//         label="Area (sq.m)"
//         value={formData.area}
//         required
//         type="number"
//         fieldKey="area"
//         onChange={handleChange}
//       />
//       <FormField<RealEstateFormData>
//         label="Rooms"
//         value={formData.rooms}
//         required
//         type="number"
//         fieldKey="rooms"
//         onChange={handleChange}
//       />
//       <FormField<RealEstateFormData>
//         label="Price"
//         value={formData.price}
//         required
//         type="number"
//         fieldKey="price"
//         onChange={handleChange}
//       />
//     </Box>
//   );
// };

// export default RealEstateCategoryStep;

import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { FormData } from "../model/types";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { DEFAULT_VALUES } from "../config/config";
import { PropertyType } from "../../../shared/types/advertesementTypes";
interface RealEstateCategoryStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  formData: FormData;
}
const RealEstateCategoryStep: React.FC<RealEstateCategoryStepProps> = ({
  register,
  errors,
  formData,
}) => {
  console.log("ERRORS!!!!!!", errors);
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Тип недвижимости"
        {...register("propertyType")}
        // defaultValue={formData.propertyType || "house"}
        defaultValue={formData.propertyType || DEFAULT_VALUES.propertyType}
        error={!!errors.name}
        helperText={errors.name?.message}
        required
        select
        sx={{ mb: 2 }}
      >
        <MenuItem value={PropertyType.HOUSE}>Дом</MenuItem>
        <MenuItem value={PropertyType.FLAT}>Квартира</MenuItem>
        <MenuItem value={PropertyType.COTTAGE}>Коттедж</MenuItem>
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
