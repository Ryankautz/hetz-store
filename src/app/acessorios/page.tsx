import type { Metadata } from "next";
import { products } from "@/data/mockProducts";
import { ProductCatalog } from "../produtos/ProductCatalog";

export const metadata: Metadata = {
  title: "Acessórios Musicais | Hetz Store",
  description:
    "Pedais, cabos, correias, afinadores e tudo que você precisa para complementar seu setup musical. Encontre os melhores acessórios na Hetz Store.",
};

export default function AcessoriosPage() {
  const acessoriosProducts = products.filter(
    (p) => p.category === "Acessórios"
  );
  return <ProductCatalog allProducts={acessoriosProducts} />;
}
