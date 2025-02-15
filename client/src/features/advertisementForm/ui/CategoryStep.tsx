import React from "react";
import RealEstateStep from "./RealEstateCategoryStep";
import AutoStep from "./AutoCategoryStep";
import ServicesStep from "./ServiceCategoryStep";
import { FormData } from "../../../shared/types/types";

interface CategoryStepProps {
  formData: Partial<FormData>;
}

const CategoryStep: React.FC<CategoryStepProps> = ({ formData }) => {
  switch (formData.type) {
    case "Недвижимость":
      return <RealEstateStep formData={formData} />;

    case "Авто":
      return <AutoStep formData={formData} />;

    case "Услуги":
      return <ServicesStep formData={formData} />;

    default:
      return null;
  }
};

export default CategoryStep;
