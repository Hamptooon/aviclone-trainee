// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { basicStepSchema } from "../model/validationSchema";
// import { Box } from "@mui/material";
// import FormField from "./FormField";
// import { updateFormData } from "../model/formSlice";
// import { useDispatch } from "react-redux";
// import { FormData } from "../model/types";

// const BasicStep = ({ formData }: { formData: FormData }) => {
//   const dispatch = useDispatch();
//   const handleChange = (key: keyof FormData, value: string | number) => {
//     dispatch(updateFormData({ [key]: value }));
//   };
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(basicStepSchema),
//     mode: "onChange",
//   });
//   return (
//     <Box sx={{ mt: 2 }}>
//       <FormField
//         label="Name"
//         {...register("name")}
//         value={formData.name}
//         required
//         fieldKey="name"
//         onChange={handleChange}
//       />
//       <FormField
//         label="Description"
//         {...register("description")}
//         value={formData.description}
//         required
//         fieldKey="description"
//         multiline
//         rows={4}
//         onChange={handleChange}
//       />
//       <FormField
//         label="Location"
//         {...register("location")}
//         value={formData.location}
//         required
//         fieldKey="location"
//         onChange={handleChange}
//       />
//       <FormField
//         label="Photo URL"
//         {...register("photo")}
//         value={formData.photo}
//         fieldKey="photo"
//         onChange={handleChange}
//       />
//       <FormField
//         label="Category"
//         {...register("type")}
//         value={formData.type}
//         required
//         select
//         fieldKey="type"
//         options={[
//           { value: "Недвижимость", label: "Real Estate" },
//           { value: "Авто", label: "Auto" },
//           { value: "Услуги", label: "Services" },
//         ]}
//         onChange={handleChange}
//       />
//     </Box>
//   );
// };

// export default BasicStep;
// import React from "react";
// import { Box, TextField, MenuItem, Button } from "@mui/material";
// import { FormData } from "../model/types";
// import { AdvertisementType } from "../../../shared/types/advertesementTypes";

// const BasicStep = ({
//   formData,
//   register,
//   errors,
// }: {
//   formData: Partial<FormData>;
//   register: any;
//   errors: any;
// }) => {
//   return (
//     <Box sx={{ mt: 2 }}>
//       <TextField
//         fullWidth
//         label="Название"
//         {...register("name")}
//         error={!!errors.name}
//         helperText={errors.name?.message}
//         required
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         fullWidth
//         label="Описание"
//         {...register("description")}
//         error={!!errors.description}
//         helperText={errors.description?.message}
//         required
//         multiline
//         rows={4}
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         fullWidth
//         label="Местоположение"
//         {...register("location")}
//         error={!!errors.location}
//         helperText={errors.location?.message}
//         required
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         fullWidth
//         label="URL изображения"
//         {...register("photo")}
//         error={!!errors.photo}
//         helperText={errors.photo?.message}
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         fullWidth
//         label="Категория"
//         {...register("type")}
//         defaultValue={formData.type || "Недвижимость"}
//         error={!!errors.type}
//         helperText={errors.type?.message}
//         required
//         select
//         sx={{ mb: 2 }}
//       >
//         <MenuItem value={AdvertisementType.REAL_ESTATE}>Недвижимость</MenuItem>
//         <MenuItem value={AdvertisementType.AUTO}>Авто</MenuItem>
//         <MenuItem value={AdvertisementType.SERVICES}>Услуги</MenuItem>
//       </TextField>
//     </Box>
//   );
// };

// export default BasicStep;
import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { FormData } from "../model/types";
import { AdvertisementType } from "../../../shared/types/advertesementTypes";

import { useFormContext } from "react-hook-form";

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
        value={typeValue || AdvertisementType.REAL_ESTATE}
        error={!!errors.type}
        helperText={errors.type?.message}
        required
        select
        sx={{ mb: 2 }}
      >
        <MenuItem value={AdvertisementType.REAL_ESTATE}>Недвижимость</MenuItem>
        <MenuItem value={AdvertisementType.AUTO}>Авто</MenuItem>
        <MenuItem value={AdvertisementType.SERVICES}>Услуги</MenuItem>
      </TextField>
    </Box>
  );
};

export default BasicStep;
