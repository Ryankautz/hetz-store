"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express) com parcelamento em até 12x sem juros, boleto bancário, Pix com 10% de desconto e transferência bancária.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "O prazo de entrega varia conforme a sua localização. Para a região Sudeste, o prazo médio é de 3 a 5 dias úteis. Para outras regiões, pode variar de 5 a 10 dias úteis. Após a confirmação do pagamento, você receberá um código de rastreamento por e-mail.",
  },
  {
    question: "Como funciona a política de trocas e devoluções?",
    answer:
      "Você pode solicitar a troca ou devolução de um produto em até 7 dias corridos após o recebimento, conforme o Código de Defesa do Consumidor. O produto deve estar em sua embalagem original, sem sinais de uso. Consulte nossa página de Trocas e Devoluções para mais detalhes.",
  },
  {
    question: "Os instrumentos vêm com garantia?",
    answer:
      "Sim! Todos os instrumentos e equipamentos vendidos na Hetz Store possuem garantia oficial do fabricante de no mínimo 12 meses. Alguns produtos possuem garantia estendida — verifique na página do produto.",
  },
  {
    question: "Vocês fazem entrega para todo o Brasil?",
    answer:
      "Sim, realizamos entregas para todos os estados brasileiros. Para compras acima de R$ 299,00, o frete é gratuito para todo o país.",
  },
  {
    question: "Como posso rastrear meu pedido?",
    answer:
      "Após o envio do seu pedido, você receberá um e-mail com o código de rastreamento. Você também pode acompanhar o status do seu pedido na nossa página de Rastreamento, informando o número do pedido e o e-mail utilizado na compra.",
  },
  {
    question: "É possível experimentar o instrumento antes de comprar?",
    answer:
      "Infelizmente, por ser uma loja online, não oferecemos teste presencial. Porém, garantimos o direito de arrependimento: se o produto não atender suas expectativas, você pode devolver em até 7 dias após o recebimento e receber reembolso integral.",
  },
  {
    question: "Vocês emitem nota fiscal?",
    answer:
      "Sim, todas as vendas incluem nota fiscal eletrônica (NF-e), que é enviada automaticamente por e-mail após a confirmação do pagamento.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/60 transition-shadow hover:shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
      >
        <span className="font-semibold text-sm text-foreground">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800/60 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Perguntas Frequentes
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Encontre respostas rápidas para as dúvidas mais comuns sobre
            pagamentos, entregas, trocas e garantia.
          </p>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="flex-1 bg-zinc-50/40 dark:bg-zinc-950/20 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-3">
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>
    </div>
  );
}
