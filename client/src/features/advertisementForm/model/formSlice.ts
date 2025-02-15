import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AdvertisementType,
  FormData,
  FormState,
  RealEstateData,
  AutoData,
  ServicesData,
} from "../../../shared/types/types";

const initialState: FormState = {
  activeStep: 0,
  totalSteps: 2,
  formData: {} as Partial<FormData>,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
    },
    setTotalSteps(state, action: PayloadAction<number>) {
      state.totalSteps = action.payload;
    },
    updateFormData(state, action: PayloadAction<Partial<FormData>>) {
      const { type } = action.payload;

      if (!type) {
        console.warn("Тип объявления не определен:", action.payload);
        return;
      }

      let updatedData: Partial<FormData> = {
        name: action.payload.name ?? "",
        description: action.payload.description ?? "",
        location: action.payload.location ?? "",
        photo: action.payload.photo ?? "",
        type,
      };

      switch (type) {
        case AdvertisementType.RealEstate:
          updatedData = {
            ...updatedData,
            propertyType: (action.payload as RealEstateData).propertyType ?? "",
            area: (action.payload as RealEstateData).area ?? "",
            rooms: (action.payload as RealEstateData).rooms ?? "",
            price: (action.payload as RealEstateData).price ?? "",
          };
          break;

        case AdvertisementType.Auto:
          updatedData = {
            ...updatedData,
            brand: (action.payload as AutoData).brand ?? "",
            model: (action.payload as AutoData).model ?? "",
            year: (action.payload as AutoData).year ?? new Date().getFullYear(),
            mileage: (action.payload as AutoData).mileage ?? 0,
          };
          break;

        case AdvertisementType.Services:
          updatedData = {
            ...updatedData,
            serviceType: (action.payload as ServicesData).serviceType ?? "",
            experience: (action.payload as ServicesData).experience ?? "",
            cost: (action.payload as ServicesData).cost ?? "",
            schedule: (action.payload as ServicesData).schedule ?? "",
          };
          break;

        default:
          console.warn("Неизвестный тип объявления:", type);
      }

      state.formData = updatedData;
    },

    resetForm(state) {
      state.activeStep = 0;
      state.formData = { ...initialState.formData }; // Вернуть полную структуру
    },
  },
});

export const { setActiveStep, updateFormData, resetForm, setTotalSteps } =
  formSlice.actions;
export default formSlice.reducer;
