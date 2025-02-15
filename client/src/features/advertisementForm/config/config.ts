import {
  ADVERTISEMENT_TYPES,
  CAR_BRANDS,
  PROPERTY_TYPES,
  SERVICE_TYPES,
} from "../../../shared/constants/advertisementsFieldTypes";

export const DEFAULT_VALUES = {
  type: ADVERTISEMENT_TYPES.realEstate, // "Недвижимость"
  propertyType: PROPERTY_TYPES.house, // "house"
  brand: CAR_BRANDS.toyota, // "Toyota"
  serviceType: SERVICE_TYPES.cleaning, // "Cleaning"
};
