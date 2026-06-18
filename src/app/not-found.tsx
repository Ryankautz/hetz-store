import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="relative mb-8">
        <div className="text-[120px] md:text-[180px] font-heading font-bold leading-none text-zinc-100 dark:text-zinc-900 select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl md:text-6xl">🎸</span>
        </div>
      </div>
      <h1 className="font-heading text-2xl md:text-3xl font-bold mb-3 text-foreground">
        Página não encontrada
      </h1>
      <p className="text-muted-foreground max-w-md mb-8 text-sm md:text-base leading-relaxed">
        A página que você está procurando pode ter sido removida, renomeada, ou
        talvez nunca tenha existido. Que tal explorar nossos produtos?
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Voltar ao Início
          </Button>
        </Link>
        <Link href="/produtos">
          <Button variant="gradient" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            Ver Produtos
          </Button>
        </Link>
      </div>
    </div>
  );
}
