export enum AdvertisementType {
  REAL_ESTATE = "Недвижимость",
  AUTO = "Авто",
  SERVICES = "Услуги",
}

export enum PropertyType {
  HOUSE = "Дом",
  FLAT = "Квартира",
  COTTAGE = "Коттедж",
}

export enum CarBrand {
  TOYOTA = "Toyota",
  HONDA = "Honda",
  MAZDA = "Mazda",
}

export enum ServiceType {
  CLEANING = "Уборка",
  DELIVERY = "Доставка",
  REPAIR = "Ремонт",
}

export interface Advertisement {
  id: number;
  name: string;
  description: string;
  location: string;
  photo?: string;
  type: AdvertisementType;
  [key: string]: any;
}

export interface PaginatedAdvertisements {
  total: number;
  data: Advertisement[];
  page: number;
  totalPages: number;
  search?: string;
}
