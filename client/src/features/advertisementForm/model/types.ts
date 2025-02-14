import {
  AdvertisementType,
  PropertyType,
  CarBrand,
  ServiceType,
} from "../../../shared/types/advertesementTypes";
export interface FormData {
  name: string;
  description: string;
  location: string;
  photo?: string;
  type: AdvertisementType;
  // RealEstate
  propertyType: PropertyType;
  area: number;
  rooms: number;
  price: number;
  // Auto
  brand: CarBrand;
  model: string;
  year: number;
  mileage?: number;
  // Services
  serviceType: ServiceType;
  experience: number;
  cost: number;
  schedule?: string;
}

export type PartialFormData = Partial<FormData>;

export interface FormState {
  activeStep: number;
  formData: FormData;
}

// import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

// export type AdvertisementType = "Недвижимость" | "Авто" | "Услуги";
// export type FormType = AdvertisementType | "";
// export type PropertyType = "house" | "flat" | "cottage" | "";
// export interface BaseFormData {
//   name: string;
//   description: string;
//   location: string;
//   photo?: string;
//   type: AdvertisementType | "";
// }

// export interface RealEstateFormData extends BaseFormData {
//   type: "Недвижимость";
//   propertyType?: string;
//   area?: string;
//   rooms?: string;
//   price?: string;
// }

// export interface AutoFormData extends BaseFormData {
//   type: "Авто";
//   brand?: string;
//   model?: string;
//   year?: string;
//   mileage?: string;
// }

// export interface ServiceFormData extends BaseFormData {
//   type: "Услуги";
//   serviceType?: string;
//   experience?: string;
//   cost?: string;
//   schedule?: string;
// }

// export interface StepProps<T extends FormData> {
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   formData: T;
//   setValue: UseFormSetValue<T>;
// }

// export const isFormDataOfType = <T extends FormData>(
//   data: FormData,
//   type: T["type"]
// ): data is T => {
//   return data.type === type;
// };
