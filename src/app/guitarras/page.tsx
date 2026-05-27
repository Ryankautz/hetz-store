import type { Metadata } from "next";
import { products } from "@/data/mockProducts";
import { GuitarCatalog } from "./GuitarCatalog";

export const metadata: Metadata = {
  title: "Guitarras Lendárias | Hetz Store",
  description: "Explore nossa coleção de guitarras Fender, Gibson, PRS, Ibanez e mais. Encontre o timbre perfeito com entrega rápida.",
};

export default function GuitarrasPage() {
  // Filtra apenas os produtos da categoria Guitarras
  const guitarProducts = products.filter((p) => p.category === "Guitarras");

  return <GuitarCatalog initialProducts={guitarProducts} />;
}
