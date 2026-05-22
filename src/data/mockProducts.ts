export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Fender Stratocaster American Professional II",
    category: "Guitarras",
    price: 11500,
    originalPrice: 12500,
    image: "/fender-stratocaster.png",
    rating: 4.9,
    isNew: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Audio-Technica ATH-M50x",
    category: "Áudio Pro",
    price: 1250,
    image: "/audio-technica-m50x.png",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "3",
    name: "Pedal Boss DS-1 Distortion",
    category: "Acessórios",
    price: 450,
    originalPrice: 550,
    image: "/boss-ds1-pedal.png",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "4",
    name: "Microfone Shure SM7B Vocal Dinâmico",
    category: "Áudio Pro",
    price: 3200,
    image: "/shure-sm7b.png",
    rating: 5.0,
    inStock: true,
  },
  {
    id: "5",
    name: "Sintetizador Korg Minilogue XD",
    category: "Teclas",
    price: 5800,
    image: "/korg-minilogue-xd.png",
    rating: 4.9,
    isNew: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Bateria Acústica Pearl Export",
    category: "Baterias",
    price: 7500,
    image: "/pearl-export-drums.png",
    rating: 4.6,
    inStock: false,
  }
];
