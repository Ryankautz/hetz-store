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
  },
  {
    id: "7",
    name: "Gibson Les Paul Standard '60s Bourbon Burst",
    category: "Guitarras",
    price: 18900,
    originalPrice: 19900,
    image: "/gibson-les-paul.png",
    rating: 4.9,
    isNew: true,
    inStock: true,
  },
  {
    id: "8",
    name: "PRS SE Custom 24 Trampas Green",
    category: "Guitarras",
    price: 7200,
    image: "/prs-custom-24.png",
    rating: 4.8,
    isNew: false,
    inStock: true,
  },
  {
    id: "9",
    name: "Ibanez RG550 Genesis Desert Sun Yellow",
    category: "Guitarras",
    price: 8500,
    image: "/ibanez-rg550.png",
    rating: 4.7,
    isNew: false,
    inStock: true,
  },
  {
    id: "10",
    name: "Epiphone Les Paul Standard 50s Goldtop",
    category: "Guitarras",
    price: 4500,
    image: "/epiphone-goldtop.png",
    rating: 4.5,
    isNew: false,
    inStock: true,
  },
  {
    id: "11",
    name: "Fender Player Telecaster Butterscotch Blonde",
    category: "Guitarras",
    price: 6800,
    image: "/fender-telecaster.png",
    rating: 4.7,
    isNew: false,
    inStock: false,
  },
  {
    id: "12",
    name: "Gretsch G2622 Streamliner Single Barrel Stain",
    category: "Guitarras",
    price: 4290,
    originalPrice: 4890,
    image: "/gretsch-g2622.png",
    rating: 4.6,
    isNew: true,
    inStock: true,
  },
  {
    id: "13",
    name: "Gibson SG Standard Heritage Cherry",
    category: "Guitarras",
    price: 14500,
    image: "/gibson-sg.png",
    rating: 4.8,
    isNew: false,
    inStock: true,
  }
];
