export interface Product {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  category: {
    ar: string;
    en: string;
  };
  images: string[];
  specifications: {
    ar: { [key: string]: string };
    en: { [key: string]: string };
  };
  brand: string;
  model: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}