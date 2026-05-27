import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ui/ProductCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { products } from "@/data/mockProducts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2000&auto=format&fit=crop"
            alt="Músico tocando guitarra"
            fill
            className="object-cover brightness-[0.3] dark:brightness-[0.2]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center text-white">
          <FadeIn delay={0.1}>
            <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-md border border-white/20">
              Nova Coleção {new Date().getFullYear()}
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
              O equipamento certo para a sua obra-prima
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-8">
              Guitarras, teclados, interfaces de áudio e muito mais. Tudo o que você precisa para criar, gravar e performar com qualidade de estúdio.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex gap-4">
              <Link href="/produtos" className={cn(buttonVariants({ size: "lg" }), "bg-white text-black hover:bg-zinc-200")}>
                Explorar Produtos
              </Link>
              <Link href="/ofertas" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "text-white bg-transparent border-white/30 hover:bg-white/10 hover:text-white")}>
                Ver Ofertas
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight mb-2 text-foreground">Destaques</h2>
              <p className="text-muted-foreground">Equipamentos selecionados a dedo pelos nossos especialistas.</p>
            </div>
            <Link href="/produtos" className="hidden md:block text-sm font-medium text-primary hover:underline">
              Ver todos &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/produtos" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              Ver todos os produtos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
