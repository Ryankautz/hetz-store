"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { products } from "@/data/mockProducts";
import { ProductCard } from "@/components/ui/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritosPage() {
  const { favorites } = useWishlist();

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/40 dark:bg-zinc-950/20">
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800/60 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <FadeIn delay={0.1}>
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
              Meus Favoritos
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Os equipamentos e instrumentos que você mais gostou salvos em um só lugar.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-12 flex-1">
        {favoriteProducts.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {favoriteProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <FadeIn delay={0.2} className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white dark:bg-zinc-900/40 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 shadow-sm max-w-2xl mx-auto">
            <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center mb-6">
              <Heart className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3">
              Sua lista de favoritos está vazia
            </h3>
            <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">
              Explore nosso catálogo e clique no coração (❤️) nos produtos que você mais gostar para salvá-los aqui para mais tarde.
            </p>
            <Link href="/produtos">
              <Button size="lg" className="gap-2 font-semibold">
                <ShoppingBag className="h-4 w-4" />
                Explorar Produtos
              </Button>
            </Link>
          </FadeIn>
        )}
      </section>
    </div>
  );
}
