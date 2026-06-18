import type { Metadata } from "next";
import { products } from "@/data/mockProducts";
import { ProductCatalog } from "../produtos/ProductCatalog";

export const metadata: Metadata = {
  title: "Baterias Acústicas e Eletrônicas | Hetz Store",
  description:
    "Baterias acústicas, eletrônicas, pratos e acessórios de percussão das melhores marcas. Encontre seu kit perfeito na Hetz Store.",
};

export default function BateriasPage() {
  const bateriasProducts = products.filter((p) => p.category === "Baterias");
  return <ProductCatalog allProducts={bateriasProducts} />;
}
