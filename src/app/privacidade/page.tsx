import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Hetz Store",
  description:
    "Conheça a Política de Privacidade da Hetz Store. Entenda como coletamos, utilizamos e protegemos seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800/60 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Política de Privacidade
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
                1. Informações que Coletamos
              </h2>
              <p>
                A Hetz Store coleta informações pessoais que você nos fornece
                diretamente ao criar uma conta, realizar uma compra ou entrar em
                contato conosco. Isso inclui: nome completo, endereço de e-mail,
                endereço de entrega, número de telefone e dados de pagamento.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                2. Como Utilizamos seus Dados
              </h2>
              <p>Utilizamos suas informações pessoais para:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Processar e entregar seus pedidos</li>
                <li>Enviar confirmações de compra e atualizações de entrega</li>
                <li>Fornecer suporte ao cliente</li>
                <li>
                  Enviar comunicações promocionais (apenas com seu
                  consentimento)
                </li>
                <li>Melhorar nossos produtos e serviços</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                3. Compartilhamento de Dados
              </h2>
              <p>
                Não vendemos ou alugamos suas informações pessoais a terceiros.
                Compartilhamos dados apenas com parceiros necessários para a
                operação dos nossos serviços, como processadores de pagamento e
                transportadoras, sempre sob acordos de confidencialidade.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                4. Segurança dos Dados
              </h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais
                para proteger seus dados contra acesso não autorizado, perda ou
                destruição. Todas as transações são processadas com criptografia
                SSL/TLS.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                5. Cookies
              </h2>
              <p>
                Utilizamos cookies para melhorar sua experiência de navegação,
                lembrar suas preferências (como tema escuro/claro) e itens do
                carrinho. Você pode desativar os cookies nas configurações do
                seu navegador, mas isso pode afetar a funcionalidade do site.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                6. Seus Direitos (LGPD)
              </h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem
                o direito de acessar, corrigir, excluir seus dados pessoais, bem
                como solicitar a portabilidade dos dados ou revogar seu
                consentimento a qualquer momento. Para exercer esses direitos,
                entre em contato pelo e-mail: privacidade@hetzstore.com.br.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                7. Contato
              </h2>
              <p>
                Em caso de dúvidas sobre esta Política de Privacidade, entre em
                contato conosco pelo e-mail{" "}
                <span className="text-foreground font-medium">
                  privacidade@hetzstore.com.br
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
