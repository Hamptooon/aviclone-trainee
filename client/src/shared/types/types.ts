export enum AdvertisementType {
  RealEstate = "Недвижимость",
  Auto = "Авто",
  Services = "Услуги",
}

// Базовые поля, общие для всех типов объявлений
export type BaseFormData = {
  name: string;
  description: string;
  location: string;
  photo?: string;
  type: AdvertisementType;
};

// Интерфейс для недвижимости
export type RealEstateData = BaseFormData & {
  type: AdvertisementType.RealEstate;
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
};

// Интерфейс для автомобилей
export type AutoData = BaseFormData & {
  type: AdvertisementType.Auto;
  brand: string;
  model: string;
  year: number;
  mileage?: number;
};

// Интерфейс для услуг
export type ServicesData = BaseFormData & {
  type: AdvertisementType.Services;
  serviceType: string;
  experience: number;
  cost: number;
  schedule?: string;
};

// Объединенный тип для всех возможных форм
export type FormData = RealEstateData | AutoData | ServicesData;

export type PartialFormData = Partial<FormData>;

export interface FormState {
  activeStep: number;
  totalSteps: number;
  formData: PartialFormData;
}
