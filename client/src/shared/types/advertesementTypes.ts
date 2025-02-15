export interface Advertisement {
  id: number;
  name: string;
  description: string;
  location: string;
  photo?: string;
  type: string;
  [key: string]: string | number | undefined;
}

export interface PaginatedAdvertisements {
  total: number;
  data: Advertisement[];
  page: number;
  totalPages: number;
  search?: string;
}
