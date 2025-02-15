import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { advertisementApi } from "../api/advertisementApi";
import { FormData } from "../types/types";

// Получение списка объявлений
// export const useAdvertisements = (params: any) => {
//   return useQuery({
//     queryKey: ["advertisements", params],
//     queryFn: () => advertisementApi.getAdvertisements(params),
//   });
// };

// Получение одного объявления по ID
export const useAdvertisementById = (id?: number) => {
  return useQuery({
    queryKey: ["ad", id],
    queryFn: () => advertisementApi.getAdvertisementById(id!),
    enabled: typeof id !== "undefined",
  });
};

// Создание объявления
export const useCreateAdvertisement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FormData>) =>
      advertisementApi.createAdvertisement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
    },
  });
};

// Обновление объявления
export const useUpdateAdvertisement = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FormData>) =>
      advertisementApi.updateAdvertisement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
      queryClient.invalidateQueries({ queryKey: ["ad", id] });
    },
  });
};
