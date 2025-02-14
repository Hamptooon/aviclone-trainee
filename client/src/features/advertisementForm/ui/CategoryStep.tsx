import React from "react";
import RealEstateStep from "./RealEstateCategoryStep";
import AutoStep from "./AutoCategoryStep";
import ServicesStep from "./ServiceCategoryStep";
import { FormData } from "../model/types";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface CategoryStepProps {
  formData: FormData;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const CategoryStep: React.FC<CategoryStepProps> = ({
  register,
  errors,
  formData,
}) => {
  switch (formData.type) {
    case "Недвижимость":
      return (
        <RealEstateStep
          formData={formData}
          register={register}
          errors={errors}
        />
      );
    case "Авто":
      return (
        <AutoStep formData={formData} register={register} errors={errors} />
      );
    case "Услуги":
      return (
        <ServicesStep formData={formData} register={register} errors={errors} />
      );
    default:
      return null;
  }
};

export default CategoryStep;
