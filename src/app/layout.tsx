import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hetz Store | Instrumentos e Equipamentos Musicais",
  description: "A melhor loja para músicos. Encontre guitarras, fones de ouvido, pedais e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-1 flex flex-col">
                {children}
              </main>
              <Footer />
              <CartDrawer />
              <Toaster richColors position="bottom-right" />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
