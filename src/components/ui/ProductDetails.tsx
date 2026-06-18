"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Minus, Plus, ShoppingCart, Truck, ShieldCheck, CreditCard, Heart } from "lucide-react";
import { Product } from "@/data/mockProducts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { FadeIn } from "@/components/ui/FadeIn";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const { addToCart, removeFromCart } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const isFav = isFavorite(product.id);

  // Formatar preço
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Gerar descrição simulada
  const getProductDescription = (name: string, category: string) => {
    if (category === "Guitarras") {
      return `A ${name} representa o auge da qualidade sonora e tocabilidade. Cada aspecto deste instrumento foi meticulosamente desenvolvido para músicos exigentes que buscam timbres cristalinos, sustentação incrível e um conforto inigualável ao tocar. Seja no estúdio ou no palco, esta guitarra entrega a performance e a fidelidade que você precisa para elevar sua arte musical.`;
    }
    if (category === "Áudio Pro") {
      return `O ${name} é a escolha definitiva para profissionais de áudio. Projetado com componentes de alta qualidade para garantir uma reprodução sonora precisa e de baixíssima distorção. Ideal para gravação, monitoramento ou mixagem, proporcionando clareza e riqueza em cada frequência.`;
    }
    if (category === "Teclas") {
      return `O ${name} combina engenharia moderna com timbres clássicos. Perfeito para produtores e tecladistas que desejam explorar texturas sonoras ricas, controles intuitivos e uma resposta tátil dinâmica. Uma ferramenta essencial para qualquer setup de produção musical ou show ao vivo.`;
    }
    return `O ${name} oferece desempenho excepcional e durabilidade para acompanhar sua jornada musical. Fabricado com materiais de alta qualidade e com acabamento premium para garantir a melhor experiência possível.`;
  };

  // Gerar especificações técnicas simuladas
  const getProductSpecs = (name: string, category: string) => {
    if (category === "Guitarras") {
      return [
        { name: "Corpo", value: name.includes("Les Paul") || name.includes("SG") ? "Mogno" : "Alder" },
        { name: "Braço", value: name.includes("Les Paul") || name.includes("SG") ? "Mogno (Perfil C)" : "Maple (Modern C)" },
        { name: "Escala", value: name.includes("Telecaster") || name.includes("Stratocaster") ? "Maple, 22 trastes" : "Rosewood, 22 trastes" },
        { name: "Captadores", value: name.includes("Les Paul") || name.includes("SG") || name.includes("Custom 24") ? "2x Humbuckers Humbucking Premium" : "3x Single-Coil Alnico V" },
        { name: "Ponte", value: name.includes("Stratocaster") || name.includes("Custom 24") ? "Tremolo flutuante sincronizado" : "Fixa Tune-O-Matic ou String-Through-Body" },
        { name: "Controles", value: "Volume Master, Tone Master, Chave Seletora de 3/5 posições" },
      ];
    }
    if (category === "Áudio Pro") {
      return [
        { name: "Tipo", value: name.includes("Microfone") ? "Dinâmico Cardióide" : "Headphone Monitor Circumaural" },
        { name: "Resposta de Frequência", value: name.includes("Microfone") ? "50 Hz a 20 kHz" : "15 Hz a 28 kHz" },
        { name: "Impedância", value: name.includes("Microfone") ? "150 Ohms" : "38 Ohms" },
        { name: "Conexão", value: name.includes("Microfone") ? "XLR Balanceado de 3 pinos" : "Cabo destacável de 3.5mm com adaptador P10 incluso" },
        { name: "Peso", value: name.includes("Microfone") ? "765g" : "285g (sem cabo)" },
      ];
    }
    return [
      { name: "Garantia", value: "12 meses contra defeitos de fabricação" },
      { name: "Origem", value: "Importação Oficial" },
      { name: "Categoria", value: category },
    ];
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    const quantityText = quantity > 1 ? `(${quantity}x)` : "";
    toast.success(`${product.name} adicionado ao carrinho! ${quantityText}`, {
      action: {
        label: "Desfazer",
        onClick: () => {
          removeFromCart(product.id);
          toast.info(`${product.name} removido do carrinho.`);
        },
      },
    });
  };

  const specs = getProductSpecs(product.name, product.category);
  const description = getProductDescription(product.name, product.category);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Voltar e Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Início
        </Link>
        <span>/</span>
        {product.category === "Guitarras" ? (
          <Link href="/guitarras" className="hover:text-foreground transition-colors">
            Guitarras
          </Link>
        ) : (
          <span className="capitalize">{product.category.toLowerCase()}</span>
        )}
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Lado Esquerdo: Imagem */}
        <div className="lg:col-span-6">
          <FadeIn delay={0.1}>
            <div className="relative aspect-square rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden group">
              {product.isNew && (
                <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground font-semibold px-3 py-1">
                  Novo
                </Badge>
              )}
              {product.originalPrice && (
                <Badge variant="destructive" className="absolute top-4 right-4 z-10 font-semibold px-3 py-1">
                  Oferta
                </Badge>
              )}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </div>
          </FadeIn>
        </div>

        {/* Lado Direito: Detalhes */}
        <div className="lg:col-span-6 flex flex-col">
          <FadeIn delay={0.2} className="flex-1 flex flex-col">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">
              {product.category}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground leading-tight">
              {product.name}
            </h1>

            {/* Avaliação */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-300 dark:text-zinc-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-xs text-muted-foreground">| {product.reviewCount} avaliações dos clientes</span>
            </div>

            {/* Preço */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <div className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">
                  Você economiza: {formatPrice(product.originalPrice - product.price)}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-2">
                Em até 12x de {formatPrice(product.price / 12)} sem juros no cartão ou com 10% de desconto no Pix.
              </div>
            </div>

            {/* Descrição */}
            <div className="mb-6">
              <h3 className="font-heading font-semibold mb-2">Sobre o Equipamento</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* Especificações Técnicas Rápidas */}
            <div className="mb-8 border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <h3 className="font-heading font-semibold mb-3">Especificações Técnicas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specs.map((spec) => (
                  <div 
                    key={spec.name} 
                    className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2 text-xs"
                  >
                    <span className="font-medium text-muted-foreground">{spec.name}:</span>
                    <span className="text-foreground text-right max-w-[180px] truncate">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles de Compra e Estoque */}
            <div className="mt-auto border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-6">
              {/* Status de estoque */}
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className={`h-2.5 w-2.5 rounded-full ${product.inStock ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                <span>
                  {product.inStock ? "Disponível em estoque - Envio Imediato" : "Fora de estoque temporariamente"}
                </span>
              </div>

              {product.inStock ? (
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  {/* Seletor de Quantidade */}
                  <div className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-11 px-3 shrink-0">
                    <button
                      onClick={handleDecrease}
                      className="flex items-center justify-center p-1 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-semibold text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className="flex items-center justify-center p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Botão Adicionar ao Carrinho */}
                  <Button
                    onClick={handleAddToCart}
                    variant="gradient"
                    size="lg"
                    className="flex-1 h-11 gap-2 font-semibold shadow-md"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Adicionar ao Carrinho
                  </Button>
                  
                  {/* Botão Favoritar */}
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-11 px-4 gap-2"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart 
                      className={`h-5 w-5 transition-colors ${
                        isFav ? "fill-red-500 text-red-500" : ""
                      }`} 
                    />
                    <span className="sr-only">Favoritar</span>
                  </Button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Button
                    disabled
                    variant="secondary"
                    size="lg"
                    className="flex-1 h-11 gap-2 font-semibold"
                  >
                    Indisponível no Momento
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-11 px-4 gap-2"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart 
                      className={`h-5 w-5 transition-colors ${
                        isFav ? "fill-red-500 text-red-500" : ""
                      }`} 
                    />
                    <span className="sr-only">Favoritar</span>
                  </Button>
                </div>
              )}

              {/* Benefícios */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-100 dark:border-zinc-900 pt-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Truck className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Frete Grátis</p>
                    <p>Para todo o país</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <CreditCard className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">12x Sem Juros</p>
                    <p>No cartão de crédito</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Garantia Oficial</p>
                    <p>De 1 ano do fabricante</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Seção de Relacionados */}
      {relatedProducts.length > 0 && (
        <FadeIn delay={0.3}>
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-16">
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-8">
              Quem viu este produto também comprou:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
