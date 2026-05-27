import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { products } from "@/data/mockProducts";
import { ProductDetails } from "@/components/ui/ProductDetails";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
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
  
  // Buscar o produto
  const product = products.find((p) => p.id === id);

  // Se o produto não existir, exibe a tela de erro customizada (ou chama o notFound do Next)
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="rounded-full bg-zinc-50 dark:bg-zinc-900 p-6 mb-6 border border-zinc-200 dark:border-zinc-800">
          <span className="text-4xl">🔍</span>
        </div>
        <h1 className="font-heading text-3xl font-bold mb-2">Produto Não Encontrado</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Infelizmente, o equipamento que você está procurando não foi encontrado em nosso catálogo. Ele pode ter sido removido ou o link está incorreto.
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Voltar ao Início
            </Button>
          </Link>
          <Link href="/guitarras">
            <Button variant="gradient" className="gap-2">
              Ver Guitarras
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Filtrar produtos relacionados (da mesma categoria, excluindo o produto atual)
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
