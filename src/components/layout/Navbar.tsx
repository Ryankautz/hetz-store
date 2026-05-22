"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold tracking-tight text-primary">Hetz Store</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/guitarras" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Guitarras</Link>
            <Link href="/audio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Áudio Pro</Link>
            <Link href="/acessorios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Acessórios</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex relative items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar instrumentos..."
              className="h-9 w-64 rounded-full pl-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCartOpen(true)}
            className="relative overflow-visible"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Carrinho</span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
