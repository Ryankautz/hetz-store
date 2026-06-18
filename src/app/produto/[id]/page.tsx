import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/mockProducts";
import { ProductDetails } from "@/components/ui/ProductDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

// Geração dinâmica de metadados para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Produto Não Encontrado | Hetz Store",
      description: "O equipamento ou instrumento musical que você procurava não foi encontrado em nossa loja.",
    };
  }

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return {
    title: `${product.name} | Hetz Store`,
    description: `Adquira seu ${product.name} na Hetz Store por apenas ${formattedPrice}. Parcelamento em até 12x sem juros, garantia oficial e frete grátis!`,
    openGraph: {
      title: `${product.name} | Hetz Store`,
      description: `Compre ${product.name} por ${formattedPrice} na melhor loja para músicos do Brasil.`,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProdutoPage({ params }: PageProps) {
  const { id } = await params;
  
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Filtrar produtos relacionados (da mesma categoria, excluindo o produto atual)
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
