import type { Metadata } from "next";
import { RefreshCcw, Package, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Trocas e Devoluções | Hetz Store",
  description:
    "Política de trocas e devoluções da Hetz Store. Saiba como solicitar uma troca, prazos e condições para devoluções de produtos.",
};

export default function TrocasPage() {
  const steps = [
    {
      icon: <Package className="h-5 w-5" />,
      title: "1. Solicite a troca",
      description:
        "Entre em contato conosco em até 7 dias corridos após o recebimento do produto, informando o número do pedido e o motivo da troca ou devolução.",
    },
    {
      icon: <RefreshCcw className="h-5 w-5" />,
      title: "2. Envie o produto",
      description:
        "Após a aprovação, você receberá uma etiqueta de envio gratuita por e-mail. Embale o produto na embalagem original e poste nos Correios.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "3. Análise do produto",
      description:
        "Ao recebermos o produto, nossa equipe fará uma análise em até 3 dias úteis para verificar as condições do item.",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "4. Resolução",
      description:
        "Após a análise, realizaremos o envio do produto substituto ou o estorno do valor pago, conforme sua preferência.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800/60 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Trocas e Devoluções
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Sua satisfação é a nossa prioridade. Confira como funciona nosso
            processo de trocas e devoluções.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 bg-zinc-50/40 dark:bg-zinc-950/20 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {steps.map((step) => (
              <div
                key={step.title}
                className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-6 shadow-sm"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                  {step.icon}
                </div>
                <h3 className="font-heading font-semibold text-sm mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Conditions */}
          <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-8 shadow-sm space-y-6">
            <h2 className="font-heading text-xl font-bold tracking-tight">
              Condições para Troca ou Devolução
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                O produto deve estar em sua embalagem original, sem sinais de uso, riscos ou avarias.
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                Todos os acessórios, manuais e brindes que acompanham o produto devem ser devolvidos junto.
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                O prazo para solicitação é de 7 dias corridos a partir da data de recebimento, conforme o Código de Defesa do Consumidor.
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                Produtos com defeito de fabricação podem ser trocados em até 30 dias.
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                O estorno será realizado no mesmo meio de pagamento utilizado na compra, em até 10 dias úteis após a aprovação.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
