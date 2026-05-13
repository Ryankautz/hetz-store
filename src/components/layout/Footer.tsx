import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="w-full border-t bg-zinc-50 dark:bg-zinc-950 py-12">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <span className="font-heading text-xl font-bold tracking-tight text-primary">Hetz Store</span>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            A sua loja definitiva para instrumentos musicais e áudio profissional. Elevando o seu som ao próximo nível com a melhor experiência de compra.
          </p>
        </div>
        <div>
          <h3 className="font-heading font-semibold mb-4 text-foreground">Departamentos</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/guitarras" className="hover:text-foreground transition-colors">Guitarras & Baixos</Link></li>
            <li><Link href="/baterias" className="hover:text-foreground transition-colors">Baterias</Link></li>
            <li><Link href="/audio" className="hover:text-foreground transition-colors">Áudio & Gravação</Link></li>
            <li><Link href="/acessorios" className="hover:text-foreground transition-colors">Acessórios</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading font-semibold mb-4 text-foreground">Suporte</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/contato" className="hover:text-foreground transition-colors">Fale Conosco</Link></li>
            <li><Link href="/faq" className="hover:text-foreground transition-colors">Perguntas Frequentes</Link></li>
            <li><Link href="/trocas" className="hover:text-foreground transition-colors">Trocas e Devoluções</Link></li>
            <li><Link href="/rastreio" className="hover:text-foreground transition-colors">Rastreie seu pedido</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading font-semibold mb-4 text-foreground">Newsletter</h3>
          <p className="text-sm text-muted-foreground mb-4">Receba ofertas exclusivas para músicos e dicas de equipamentos.</p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Seu melhor e-mail" className="bg-white dark:bg-zinc-900" />
            <Button>Assinar</Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-8 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Hetz Store. Todos os direitos reservados.</p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <Link href="/privacidade" className="hover:text-foreground transition-colors">Política de Privacidade</Link>
          <Link href="/termos" className="hover:text-foreground transition-colors">Termos de Serviço</Link>
        </div>
      </div>
    </footer>
  );
}
