"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/guitarras", label: "Guitarras" },
  { href: "/audio", label: "Áudio Pro" },
  { href: "/acessorios", label: "Acessórios" },
  { href: "/baterias", label: "Baterias" },
  { href: "/ofertas", label: "Ofertas" },
];

export function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { favoritesCount } = useWishlist();
  const router = useRouter();

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Mobile search state
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Handle desktop search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produtos?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Handle mobile search submit
  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produtos?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileSearchOpen(false);
    }
  };

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsMobileSearchOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking a link
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-black/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold tracking-tight text-primary">
                Hetz Store
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex relative items-center"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar instrumentos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-64 rounded-full pl-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
              />
            </form>

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>

            <ThemeToggle />

            {/* Wishlist Button */}
            <Link href="/favoritos">
              <Button
                variant="ghost"
                size="icon"
                className="relative overflow-visible"
                aria-label={`Favoritos`}
              >
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {favoritesCount}
                  </span>
                )}
                <span className="sr-only">Favoritos</span>
              </Button>
            </Link>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative overflow-visible"
              aria-label={`Carrinho com ${cartCount} ${cartCount === 1 ? "item" : "itens"}`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Carrinho</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar (dropdown below header) */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden border-t border-zinc-200 dark:border-zinc-800 md:hidden"
            >
              <form
                onSubmit={handleMobileSearchSubmit}
                className="container mx-auto px-4 py-3"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar instrumentos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-full rounded-full pl-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full max-w-sm flex-col bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6">
                <span className="font-heading text-lg font-bold tracking-tight text-primary">
                  Menu
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  aria-label="Fechar menu"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Fechar</span>
                </Button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto p-6 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleMobileLinkClick}
                      className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="border-t border-zinc-200 dark:border-zinc-800 my-4" />

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 * NAV_LINKS.length,
                    duration: 0.2,
                  }}
                >
                  <Link
                    href="/produtos"
                    onClick={handleMobileLinkClick}
                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    Todos os Produtos
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 * (NAV_LINKS.length + 1),
                    duration: 0.2,
                  }}
                >
                  <Link
                    href="/contato"
                    onClick={handleMobileLinkClick}
                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    Fale Conosco
                  </Link>
                </motion.div>
              </nav>

              {/* Drawer Footer */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
                <p className="text-xs text-muted-foreground text-center">
                  © {new Date().getFullYear()} Hetz Store
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
