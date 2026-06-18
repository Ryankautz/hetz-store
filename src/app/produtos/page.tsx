import type { Metadata } from "next";
import { products } from "@/data/mockProducts";
import { ProductCatalog } from "./ProductCatalog";

export const metadata: Metadata = {
  title: "Todos os Produtos | Hetz Store",
  description:
    "Explore nosso catálogo completo de instrumentos musicais e equipamentos de áudio profissional. Guitarras, teclados, microfones, pedais e muito mais.",
  openGraph: {
    title: "Todos os Produtos | Hetz Store",
    description:
      "Encontre o equipamento perfeito para elevar seu som. Catálogo completo com as melhores marcas.",
  },
};

export default function ProdutosPage() {
  return <ProductCatalog allProducts={products} />;
}
