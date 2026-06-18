"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Product } from "@/data/mockProducts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, removeFromCart } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();
  const isFav = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`, {
      action: {
        label: "Desfazer",
        onClick: () => {
          removeFromCart(product.id);
          toast.info(`${product.name} removido do carrinho.`);
        },
      },
    });
  };

  // Formatar preço para o padrão brasileiro (Reais)
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <motion.div
      whileHover={{ y: -5 }} // Animação do framer-motion: sobe 5px ao passar o mouse
      transition={{ duration: 0.2 }}
      className="group h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-shadow hover:shadow-xl relative">
        <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          {product.isNew && (
            <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground">
              Novo
            </Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive" className="absolute top-3 right-3 z-10">
              Oferta
            </Badge>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product.id);
            }}
            className="absolute bottom-3 right-3 z-20 p-2 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 hover:scale-110 transition-transform"
            aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart 
              className={`h-5 w-5 transition-colors ${
                isFav ? "fill-red-500 text-red-500" : "text-zinc-600 dark:text-zinc-400"
              }`} 
            />
          </button>
          {/* Usamos o Next Image para otimização automática */}
          <Link href={`/produto/${product.id}`} className="block w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>
        
        <CardContent className="flex-1 p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">{product.category}</p>
          <Link href={`/produto/${product.id}`} className="hover:underline">
            <h3 className="font-heading font-semibold text-lg line-clamp-2 leading-tight mb-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 mb-4">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">{formattedPrice}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-5 justify-center">
          <Button 
            className="w-full gap-2 transition-all" 
            disabled={!product.inStock}
            variant={product.inStock ? "gradient" : "secondary"}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
