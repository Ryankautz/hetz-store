import type { Metadata } from "next";
import { products } from "@/data/mockProducts";
import { ProductCatalog } from "../produtos/ProductCatalog";

export const metadata: Metadata = {
  title: "Ofertas Especiais | Hetz Store",
  description:
    "Aproveite as melhores ofertas em instrumentos musicais e equipamentos de áudio. Descontos imperdíveis por tempo limitado.",
};

export default function OfertasPage() {
  const offerProducts = products.filter((p) => p.originalPrice);
  return <ProductCatalog allProducts={offerProducts} />;
}
