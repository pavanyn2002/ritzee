import productsData from './products.json';

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageHint: string;
  modelUrl: string;
  category: 'Oversized T-Shirts' | 'Hoodies' | 'Baggy Jeans';
};

export const products: Product[] = productsData.products as Product[];
