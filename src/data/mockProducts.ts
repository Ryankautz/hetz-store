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
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    isNew: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Audio-Technica ATH-M50x",
    category: "Áudio Pro",
    price: 1250,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "3",
    name: "Pedal Boss DS-1 Distortion",
    category: "Acessórios",
    price: 450,
    originalPrice: 550,
    image: "https://images.unsplash.com/photo-1598463051410-f80e5e01b339?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "4",
    name: "Microfone Shure SM7B Vocal Dinâmico",
    category: "Áudio Pro",
    price: 3200,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    rating: 5.0,
    inStock: true,
  },
  {
    id: "5",
    name: "Sintetizador Korg Minilogue XD",
    category: "Teclas",
    price: 5800,
    image: "https://images.unsplash.com/photo-1599540059345-422fb8462ab9?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    isNew: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Bateria Acústica Pearl Export",
    category: "Baterias",
    price: 7500,
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    inStock: false,
  }
];
