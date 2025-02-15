import { FormData } from "../types/types";
import { api } from "./api";
export type AdvertisementFiltersType = {
  type?: string;
  //real_state
  propertyType?: string;
  minArea?: number;
  maxArea?: number;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  maxRooms?: number;
  //auto
  brand?: string;
  minYear?: number;
  maxYear?: number;
  model?: string;
  //services
  serviceType?: string;
  minExperience?: number;
  minCost?: number;
  maxCost?: number;
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

  updateAdvertisement: async (id: number, data: Partial<FormData>) => {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
  },
  createAdvertisement: async (data: Partial<FormData>) => {
    const response = await api.post("/items", data);
    return response.data;
  },
};
