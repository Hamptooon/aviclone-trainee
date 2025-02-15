import React from "react";
import { Box } from "@mui/material";
import { ADVERTISEMENT_TYPES } from "../../shared/constants/advertisementsFieldTypes";
import { CategoryFilter } from "./ui/CategoryFilter";
import { RealEstateFilters } from "./ui/RealEstateFilters";
import { CarFilters } from "./ui/CarFilters";
import { ServicesFilters } from "./ui/ServicesFilters";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";

export const AdvertisementFilters: React.FC = () => {
  const { type } = useSelector((state: RootState) => state.filters);
  return (
    <Box sx={{ mb: 3 }}>
      <CategoryFilter />
      {type === ADVERTISEMENT_TYPES.realEstate && <RealEstateFilters />}
      {type === ADVERTISEMENT_TYPES.auto && <CarFilters />}
      {type === ADVERTISEMENT_TYPES.services && <ServicesFilters />}
    </Box>
  );
};
