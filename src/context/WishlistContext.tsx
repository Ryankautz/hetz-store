"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface WishlistContextType {
  favorites: string[];
  favoritesCount: number;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("hetz_wishlist");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("hetz_wishlist", JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(productId);
      if (isFav) {
        toast.info("Removido dos favoritos");
        return prev.filter((id) => id !== productId);
      } else {
        toast.success("Adicionado aos favoritos ❤️");
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
