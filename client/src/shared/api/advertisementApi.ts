import {
  AdvertisementType,
  PropertyType,
  CarBrand,
  ServiceType,
  Advertisement,
} from "../types/advertesementTypes";
import { api } from "./api";
export type AdvertisementFiltersType = {
  type?: AdvertisementType;
  propertyType?: PropertyType;
  minArea?: number;
  maxArea?: number;
  brand?: CarBrand;
  minYear?: number;
  serviceType?: ServiceType;
  minExperience?: number;
};

export const advertisementApi = {
  getAdvertisements: async (
    params: {
      page: number;
      limit: number;
      search?: string;
    } & AdvertisementFiltersType
  ) => {
    const response = await api.get("/items", { params });
    return response.data;
  },
  getAdvertisementById: async (id: number) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  updateAdvertisement: async (id: number, data: Advertisement) => {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
  },
};
