import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Serviço | Hetz Store",
  description:
    "Leia os Termos de Serviço da Hetz Store. Condições gerais de uso do site, compras, pagamentos e responsabilidades.",
};

export default function TermosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800/60 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Termos de Serviço
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Última atualização: Janeiro de {new Date().getFullYear()}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 bg-zinc-50/40 dark:bg-zinc-950/20 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-8 md:p-10 shadow-sm space-y-8 text-sm text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e utilizar o site da Hetz Store, você concorda com
                estes Termos de Serviço. Se não concordar com qualquer parte
                destes termos, pedimos que não utilize nossos serviços.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                2. Descrição dos Serviços
              </h2>
              <p>
                A Hetz Store é uma loja virtual de instrumentos musicais e
                equipamentos de áudio profissional. Oferecemos a venda de
                produtos novos de marcas nacionais e internacionais, com
                entrega para todo o território brasileiro.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                3. Preços e Pagamentos
              </h2>
              <p>
                Os preços exibidos no site são em Reais (BRL) e incluem todos os
                impostos aplicáveis. A Hetz Store se reserva o direito de
                alterar preços a qualquer momento, sem aviso prévio, sendo
                garantido o preço vigente no momento da finalização da compra.
                Aceitamos pagamento por cartão de crédito, boleto bancário e
                Pix.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                4. Entregas
              </h2>
              <p>
                Os prazos de entrega são estimados e contados a partir da
                confirmação do pagamento. A Hetz Store não se responsabiliza por
                atrasos causados por fatores externos, como greves, desastres
                naturais ou problemas na transportadora. Frete grátis para
                compras acima de R$ 299,00.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                5. Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo do site — incluindo textos, imagens, logotipos,
                ícones e layout — é de propriedade da Hetz Store ou de seus
                licenciadores, protegido por leis de direitos autorais e
                propriedade intelectual. É proibida a reprodução sem
                autorização prévia.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                6. Limitação de Responsabilidade
              </h2>
              <p>
                A Hetz Store se empenha para manter as informações do site
                atualizadas e precisas. No entanto, não garantimos que o site
                esteja livre de erros ou que o acesso seja ininterrupto. A Hetz
                Store não se responsabiliza por danos indiretos decorrentes do
                uso do site.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                7. Legislação Aplicável
              </h2>
              <p>
                Estes Termos de Serviço são regidos pelas leis da República
                Federativa do Brasil. Qualquer disputa será submetida ao foro
                da comarca de São Paulo — SP, com exclusão de qualquer outro,
                por mais privilegiado que seja.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                8. Contato
              </h2>
              <p>
                Para dúvidas sobre estes Termos de Serviço, entre em contato
                pelo e-mail{" "}
                <span className="text-foreground font-medium">
                  juridico@hetzstore.com.br
                </span>{" "}
                ou pelo telefone{" "}
                <span className="text-foreground font-medium">
                  (11) 4002-8922
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
