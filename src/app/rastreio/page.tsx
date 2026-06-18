"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function RastreioPage() {
  const [orderCode, setOrderCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderCode.trim()) {
      toast.error("Por favor, informe o código do pedido.");
      return;
    }
    toast.info(
      "Sistema de rastreamento em implementação. Em breve você poderá acompanhar seu pedido por aqui!"
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800/60 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Rastreie seu Pedido
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Acompanhe o status de entrega do seu pedido informando o código
            recebido por e-mail.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 bg-zinc-50/40 dark:bg-zinc-950/20 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-xl">
          {/* Search Form */}
          <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-8 shadow-sm mb-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="order-code"
                  className="text-sm font-medium text-foreground"
                >
                  Código do Pedido
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="order-code"
                    type="text"
                    placeholder="Ex: HZ-2025-00123"
                    value={orderCode}
                    onChange={(e) => setOrderCode(e.target.value)}
                    className="pl-9 h-11 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-10 gap-2">
                <Search className="h-4 w-4" />
                Rastrear Pedido
              </Button>
            </form>
          </div>

          {/* Timeline Example */}
          <div>
            <h2 className="font-heading text-lg font-bold tracking-tight mb-6 text-center text-muted-foreground">
              Como funciona o rastreamento
            </h2>
            <div className="space-y-0">
              {[
                {
                  icon: <CheckCircle2 className="h-4 w-4" />,
                  title: "Pedido Confirmado",
                  desc: "O pagamento foi aprovado e o pedido está em processamento.",
                },
                {
                  icon: <Package className="h-4 w-4" />,
                  title: "Produto Embalado",
                  desc: "O produto foi separado e embalado com segurança.",
                },
                {
                  icon: <Truck className="h-4 w-4" />,
                  title: "Em Transporte",
                  desc: "O pedido saiu do nosso centro de distribuição e está a caminho.",
                },
                {
                  icon: <CheckCircle2 className="h-4 w-4" />,
                  title: "Entregue",
                  desc: "O pedido foi entregue no endereço cadastrado.",
                },
              ].map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-muted-foreground">
                      {step.icon}
                    </div>
                    {i < 3 && (
                      <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h3 className="text-sm font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
