export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}

export interface CustomError {
  message: string;
  code?: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}