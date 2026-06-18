import type { Metadata } from "next";
import { products } from "@/data/mockProducts";
import { ProductCatalog } from "../produtos/ProductCatalog";

export const metadata: Metadata = {
  title: "Áudio Profissional | Hetz Store",
  description:
    "Microfones, fones de ouvido e interfaces de áudio profissional. Equipamentos para gravação, mixagem e produção musical com qualidade de estúdio.",
};

export default function AudioPage() {
  const audioProducts = products.filter((p) => p.category === "Áudio Pro");
  return <ProductCatalog allProducts={audioProducts} />;
}
