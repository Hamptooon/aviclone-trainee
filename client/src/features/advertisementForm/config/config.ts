import {
  AdvertisementType,
  PropertyType,
  CarBrand,
  ServiceType,
} from "../../../shared/types/advertesementTypes";

export const DEFAULT_VALUES = {
  type: AdvertisementType.REAL_ESTATE, // "Недвижимость"
  propertyType: PropertyType.HOUSE, // "house"
  brand: CarBrand.TOYOTA, // "Toyota"
  serviceType: ServiceType.CLEANING, // "Cleaning"
};
