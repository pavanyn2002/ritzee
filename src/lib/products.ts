export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageHint: string;
  modelUrl: string;
  category: 'Oversized T-Shirts' | 'Hoodies' | 'Baggy Jeans';
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'astral-projection-tee',
    name: 'Astral Projection Tee',
    description: 'A heavyweight cotton tee featuring a distorted astral graphic. Made for interdimensional travel. Pure 240gsm cotton.',
    price: 65.0,
    image: '/products/tshirt1.png',
    imageHint: 'tshirt black',
    modelUrl: '/models/tshirt1.glb',
    category: 'Oversized T-Shirts',
  },
  {
    id: '2',
    slug: 'glitch-in-reality-hoodie',
    name: 'Glitch in Reality Hoodie',
    description: 'Oversized hoodie with pixelated embroidery. A comfortable layer for when reality feels a bit off. 100% French Terry.',
    price: 120.0,
    image: '/products/hoodie1.png',
    imageHint: 'hoodie gray',
    modelUrl: '/models/tshirt2.glb',
    category: 'Hoodies',
  },
  {
    id: '3',
    slug: 'y2k-dreamscape-shirt',
    name: 'Y2K Dreamscape Shirt',
    description: 'Vibrant, all-over print button-up shirt inspired by early 2000s digital aesthetics. Lightweight and breathable.',
    price: 85.0,
    image: '/products/shirt1.png',
    imageHint: 'colorful shirt',
    modelUrl: '/models/tshirt3.glb',
    category: 'Oversized T-Shirts',
  },
  {
    id: '4',
    slug: 'cyber-wash-baggy-jeans',
    name: 'Cyber-Wash Baggy Jeans',
    description: 'Acid-washed baggy jeans with a futuristic fit. Features utility pockets and a relaxed silhouette for maximum comfort.',
    price: 150.0,
    image: '/products/jeans1.png',
    imageHint: 'baggy jeans',
    modelUrl: '/models/jeans1.glb',
    category: 'Baggy Jeans',
  },
];
