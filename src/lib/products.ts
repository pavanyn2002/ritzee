export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageHint: string;
  modelUrl: string;
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'astral-projection-tee',
    name: 'Astral Projection Tee',
    description: 'A heavyweight cotton tee featuring a distorted astral graphic. Made for interdimensional travel. Pure 240gsm cotton.',
    price: 65.0,
    image: 'https://picsum.photos/seed/a4e1e8/600/600',
    imageHint: 'tshirt black',
    modelUrl: '/models/tshirt1.glb',
  },
  {
    id: '2',
    slug: 'glitch-in-reality-hoodie',
    name: 'Glitch in Reality Hoodie',
    description: 'Oversized hoodie with pixelated embroidery. A comfortable layer for when reality feels a bit off. 100% French Terry.',
    price: 120.0,
    image: 'https://picsum.photos/seed/b8b8d/600/600',
    imageHint: 'hoodie gray',
    modelUrl: '/models/tshirt2.glb',
  },
  {
    id: '3',
    slug: 'y2k-dreamscape-shirt',
    name: 'Y2K Dreamscape Shirt',
    description: 'Vibrant, all-over print button-up shirt inspired by early 2000s digital aesthetics. Lightweight and breathable.',
    price: 85.0,
    image: 'https://picsum.photos/seed/d0f8c/600/600',
    imageHint: 'colorful shirt',
    modelUrl: '/models/tshirt3.glb',
  },
];
