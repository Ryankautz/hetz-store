"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Package,
  ArrowUpDown,
} from "lucide-react";
import { Product } from "@/data/mockProducts";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/FadeIn";

interface ProductCatalogProps {
  allProducts: Product[];
}

const CATEGORIES = ["Guitarras", "Áudio Pro", "Teclas", "Acessórios", "Baterias"];

export function ProductCatalog({ allProducts }: ProductCatalogProps) {
  return (
    <Suspense fallback={<ProductCatalogFallback />}>
      <ProductCatalogInner allProducts={allProducts} />
    </Suspense>
  );
}

function ProductCatalogFallback() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/40 dark:bg-zinc-950/20">
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800/60 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg mx-auto mb-3 animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg mx-auto animate-pulse" />
        </div>
      </section>
      <section className="container mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-zinc-100 dark:bg-zinc-900 rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCatalogInner({ allProducts }: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceLimit, setPriceLimit] = useState<number>(() => {
    if (allProducts.length === 0) return 20000;
    return Math.max(...allProducts.map((p) => p.price));
  });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const maxAvailablePrice = useMemo(() => {
    if (allProducts.length === 0) return 20000;
    return Math.max(...allProducts.map((p) => p.price));
  }, [allProducts]);

  const minAvailablePrice = useMemo(() => {
    if (allProducts.length === 0) return 0;
    return Math.min(...allProducts.map((p) => p.price));
  }, [allProducts]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProducts.length };
    CATEGORIES.forEach((cat) => {
      counts[cat] = allProducts.filter((p) => p.category === cat).length;
    });
    return counts;
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        const matchesPrice = product.price <= priceLimit;
        const matchesStock = !inStockOnly || product.inStock;
        return matchesSearch && matchesCategory && matchesPrice && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating-desc") return b.rating - a.rating;
        if (sortBy === "featured") {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.rating - a.rating;
        }
        return 0;
      });
  }, [allProducts, searchQuery, selectedCategory, priceLimit, inStockOnly, sortBy]);

  const isFiltersDirty = useMemo(() => {
    return (
      searchQuery !== "" ||
      selectedCategory !== "all" ||
      priceLimit < maxAvailablePrice ||
      inStockOnly === true
    );
  }, [searchQuery, selectedCategory, priceLimit, inStockOnly, maxAvailablePrice]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceLimit(maxAvailablePrice);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderFilters = () => (
    <div className="space-y-6">
      {/* Busca */}
      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
          Pesquisar
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Nome do produto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
          />
        </div>
      </div>

      {/* Categorias */}
      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
          Categoria
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-foreground"
            }`}
          >
            <span>Todas as Categorias</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === "all"
                  ? "bg-white/20 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-muted-foreground"
              }`}
            >
              {categoryCounts["all"]}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                disabled={count === 0}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-foreground"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Faixa de Preço */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
            Preço Máximo
          </label>
          <span className="text-sm font-bold text-primary bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded">
            {formatBRL(priceLimit)}
          </span>
        </div>
        <input
          type="range"
          min={minAvailablePrice}
          max={maxAvailablePrice}
          step={100}
          value={priceLimit}
          onChange={(e) => setPriceLimit(Number(e.target.value))}
          aria-label="Preço máximo"
          className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatBRL(minAvailablePrice)}</span>
          <span>{formatBRL(maxAvailablePrice)}</span>
        </div>
      </div>

      {/* Disponibilidade */}
      <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
        <label className="flex items-center gap-3 cursor-pointer group py-2 select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded border-zinc-300 text-primary focus:ring-primary h-4 w-4 transition-colors"
          />
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            Apenas em estoque
          </span>
        </label>
      </div>

      {/* Limpar Filtros */}
      {isFiltersDirty && (
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="w-full flex items-center justify-center gap-2 text-xs h-9"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Limpar Filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/40 dark:bg-zinc-950/20">
      {/* Header Section */}
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800/60 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <FadeIn delay={0.1}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 dark:bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/10 uppercase tracking-widest mb-4">
              <Package className="h-3 w-3" />
              Catálogo Completo
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
              Todos os Produtos
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Encontre o equipamento ideal para a sua música. Guitarras,
              microfones, teclados, pedais e muito mais.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="container mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Filtros - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/60 mb-6">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
                  Filtros
                </h3>
                {isFiltersDirty && (
                  <span className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
              {renderFilters()}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Action Header */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/50">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 h-9 px-4"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                  {isFiltersDirty && (
                    <Badge
                      variant="default"
                      className="h-4 px-1 text-[9px] min-w-4 justify-center bg-primary text-primary-foreground rounded-full"
                    >
                      !
                    </Badge>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground">
                  Mostrando{" "}
                  <span className="font-semibold text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-foreground">
                    {allProducts.length}
                  </span>{" "}
                  produtos
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap hidden sm:inline flex items-center gap-1">
                  <ArrowUpDown className="h-3 w-3" /> Ordenar por:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-sm font-medium transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-zinc-900 cursor-pointer text-foreground"
                >
                  <option value="featured" className="dark:bg-zinc-900">
                    Destaques
                  </option>
                  <option value="price-asc" className="dark:bg-zinc-900">
                    Preço: Menor ao Maior
                  </option>
                  <option value="price-desc" className="dark:bg-zinc-900">
                    Preço: Maior ao Menor
                  </option>
                  <option value="rating-desc" className="dark:bg-zinc-900">
                    Melhor Avaliadas
                  </option>
                </select>
              </div>
            </div>

            {/* Product Grid with Animation */}
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="h-full"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white dark:bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800"
              >
                <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-6">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-muted-foreground max-w-sm text-sm mb-8 leading-relaxed">
                  Não encontramos nenhum produto correspondente aos filtros
                  selecionados. Tente ajustar sua busca ou limpar os filtros.
                </p>
                <Button onClick={handleClearFilters} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Redefinir Filtros
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md h-full bg-white dark:bg-zinc-950 p-6 overflow-y-auto flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
                  Filtros
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="h-8 w-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-center transition-colors"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Fechar</span>
                </button>
              </div>
              <div className="flex-1">{renderFilters()}</div>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="flex-1 h-10 gap-2"
                  disabled={!isFiltersDirty}
                >
                  Limpar
                </Button>
                <Button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 h-10"
                >
                  Aplicar Filtros
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
