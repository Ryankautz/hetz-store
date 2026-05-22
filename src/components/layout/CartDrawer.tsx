"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Formatar preço para o padrão brasileiro
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Fechar ao pressionar a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  // Fechar ao clicar fora
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      setIsCartOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay / Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full max-w-md flex-col bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Seu Carrinho
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar</span>
              </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex h-[80%] flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-zinc-50 dark:bg-zinc-900 p-6 mb-4 ring-1 ring-zinc-100 dark:ring-zinc-800">
                    <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading font-medium text-base mb-1">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs mb-6">
                    Parece que você ainda não adicionou nenhum equipamento musical ao seu carrinho.
                  </p>
                  <Button onClick={() => setIsCartOpen(false)}>
                    Continuar Comprando
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      {/* Image */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Info & Actions */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                              {item.product.category}
                            </p>
                            <h4 className="font-medium text-sm text-foreground line-clamp-1 leading-snug">
                              {item.product.name}
                            </h4>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.product.id)}
                            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span className="sr-only">Remover</span>
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Price */}
                          <p className="text-sm font-semibold text-foreground">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 h-8">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="flex items-center justify-center h-full px-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground border-r border-zinc-200 dark:border-zinc-800 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="flex items-center justify-center h-full px-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground border-l border-zinc-200 dark:border-zinc-800 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 p-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Impostos e custos de envio serão calculados na finalização do pedido.
                </p>
                <div className="grid grid-cols-1 gap-2 pt-2">
                  <Button size="lg" className="w-full font-medium">
                    Finalizar Compra
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="w-full text-xs text-muted-foreground hover:text-destructive"
                  >
                    Limpar Carrinho
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
