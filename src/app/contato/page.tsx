import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Fale Conosco | Hetz Store",
  description:
    "Entre em contato com a Hetz Store. Tire dúvidas sobre produtos, pedidos, trocas e devoluções. Estamos prontos para ajudar.",
};

export default function ContatoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800/60 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Fale Conosco
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Tem dúvidas sobre algum produto ou precisa de suporte com seu
            pedido? Nossa equipe está pronta para ajudar.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 bg-zinc-50/40 dark:bg-zinc-950/20 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="font-heading text-2xl font-bold tracking-tight">
                Informações de Contato
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">E-mail</h3>
                    <p className="text-sm text-muted-foreground">
                      contato@hetzstore.com.br
                    </p>
                    <p className="text-sm text-muted-foreground">
                      suporte@hetzstore.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Telefone</h3>
                    <p className="text-sm text-muted-foreground">
                      (11) 4002-8922
                    </p>
                    <p className="text-sm text-muted-foreground">
                      WhatsApp: (11) 99999-0000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Endereço</h3>
                    <p className="text-sm text-muted-foreground">
                      Rua da Música, 1000 — Vila Mariana
                    </p>
                    <p className="text-sm text-muted-foreground">
                      São Paulo — SP, 04023-062
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">
                      Horário de Atendimento
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Segunda a Sexta: 9h às 18h
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sábados: 9h às 13h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (visual only) */}
            <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-8 shadow-sm">
              <h2 className="font-heading text-xl font-bold tracking-tight mb-6">
                Envie uma Mensagem
              </h2>
              <form className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Nome completo
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Seu nome"
                    className="w-full h-10 rounded-lg border border-input bg-transparent px-3 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-foreground"
                  >
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full h-10 rounded-lg border border-input bg-transparent px-3 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-medium text-foreground"
                  >
                    Assunto
                  </label>
                  <select
                    id="contact-subject"
                    className="w-full h-10 rounded-lg border border-input bg-transparent px-3 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-zinc-900 cursor-pointer text-foreground"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="duvida">Dúvida sobre produto</option>
                    <option value="pedido">Sobre meu pedido</option>
                    <option value="troca">Trocas e devoluções</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-foreground"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Descreva sua dúvida ou solicitação..."
                    className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 placeholder:text-muted-foreground resize-none"
                  />
                </div>
                <button
                  type="button"
                  className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
