"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package, Truck, CheckCircle2, ArrowLeft, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

type TrackingStep = {
  title: string;
  desc: string;
  date: string;
  time: string;
  completed: boolean;
};

type TrackingInfo = {
  code: string;
  status: "delivered" | "shipping";
  carrier: string;
  estimatedDelivery: string;
  steps: TrackingStep[];
};

function generateTrackingData(code: string): TrackingInfo {
  const now = new Date();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const cleanCode = code.replace(/\D/g, "");
  const lastDigit = cleanCode ? parseInt(cleanCode.slice(-1)) : 0;
  
  const dateStep1 = new Date(now);
  dateStep1.setDate(now.getDate() - 3);
  
  const dateStep2 = new Date(now);
  dateStep2.setDate(now.getDate() - 3);
  
  const dateStep3 = new Date(now);
  dateStep3.setDate(now.getDate() - 2);
  
  const dateStep4 = new Date(now);
  dateStep4.setDate(now.getDate() - 1);
  
  const dateStep5 = new Date(now);
  
  const steps: TrackingStep[] = [
    {
      title: "Pedido Recebido",
      desc: "Recebemos o registro do seu pedido e estamos aguardando a aprovação da operadora financeira.",
      date: formatDate(dateStep1),
      time: "14:32",
      completed: true,
    },
    {
      title: "Pagamento Confirmado",
      desc: "O pagamento foi autorizado e o pedido foi enviado para faturamento.",
      date: formatDate(dateStep2),
      time: "14:35",
      completed: true,
    },
    {
      title: "Nota Fiscal Emitida",
      desc: "A Nota Fiscal Eletrônica (NF-e) foi emitida e enviada para o seu e-mail.",
      date: formatDate(dateStep3),
      time: "09:12",
      completed: true,
    },
    {
      title: "Despachado",
      desc: "O seu pacote foi entregue à transportadora parceira para início da rota.",
      date: formatDate(dateStep4),
      time: "16:45",
      completed: true,
    },
  ];

  if (lastDigit % 2 === 0) {
    // Delivered (even digit)
    steps.push(
      {
        title: "Em Rota de Entrega",
        desc: "O transportador saiu com o seu pacote para entrega ao destinatário.",
        date: formatDate(dateStep5),
        time: "08:30",
        completed: true,
      },
      {
        title: "Entregue",
        desc: "Encomenda entregue com sucesso. Obrigado por comprar na Hetz Store!",
        date: formatDate(dateStep5),
        time: "15:20",
        completed: true,
      }
    );
  } else {
    // In transit (odd digit)
    steps.push(
      {
        title: "Em Rota de Entrega",
        desc: "O transportador saiu com o seu pacote para entrega ao destinatário.",
        date: formatDate(dateStep5),
        time: "08:30",
        completed: true,
      },
      {
        title: "Entregue",
        desc: "Encomenda entregue com sucesso. Obrigado por comprar na Hetz Store!",
        date: "",
        time: "",
        completed: false,
      }
    );
  }

  return {
    code,
    status: lastDigit % 2 === 0 ? "delivered" : "shipping",
    carrier: "LogiHetz Express",
    estimatedDelivery: formatDate(new Date(now.getTime() + (lastDigit % 2 === 0 ? 0 : 2) * 24 * 60 * 60 * 1000)),
    steps,
  };
}

function RastreioContent() {
  const searchParams = useSearchParams();
  const codeParam = searchParams.get("code") || "";

  const [orderCode, setOrderCode] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (codeParam) {
      setOrderCode(codeParam);
      handleSearch(codeParam);
    }
  }, [codeParam]);

  const handleSearch = async (code: string) => {
    const formattedCode = code.trim().toUpperCase();
    if (!formattedCode) {
      toast.error("Por favor, informe o código do pedido.");
      return;
    }

    if (!formattedCode.startsWith("HZ-") && formattedCode.length < 6) {
      toast.error("Formato de código inválido. Exemplo: HZ-2026-12345");
      return;
    }

    setIsSearching(true);
    setTrackingInfo(null);
    setHasSearched(true);

    // Simulate API lookup
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSearching(false);
    setTrackingInfo(generateTrackingData(formattedCode));
    toast.success("Informações do pedido carregadas!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(orderCode);
  };

  const handleReset = () => {
    setOrderCode("");
    setTrackingInfo(null);
    setHasSearched(false);
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
            recebido por e-mail no formato <strong className="text-foreground">HZ-ANO-NUMERO</strong>.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 bg-zinc-50/40 dark:bg-zinc-950/20 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <AnimatePresence mode="wait">
            {!hasSearched || isSearching ? (
              <motion.div
                key="search-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-8 shadow-sm"
              >
                {isSearching ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                    <h3 className="font-semibold text-lg mb-1">Buscando Informações</h3>
                    <p className="text-sm text-muted-foreground">Aguarde enquanto consultamos nossa base de dados...</p>
                  </div>
                ) : (
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
                          placeholder="Ex: HZ-2026-12345"
                          value={orderCode}
                          onChange={(e) => setOrderCode(e.target.value)}
                          className="pl-9 h-11 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-11 gap-2 text-sm font-semibold">
                      <Search className="h-4 w-4" />
                      Rastrear Pedido
                    </Button>
                  </form>
                )}
              </motion.div>
            ) : (
              trackingInfo && (
                <motion.div
                  key="tracking-details"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {/* Status Banner */}
                  <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Código</span>
                        <span className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-foreground">
                          {trackingInfo.code}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold font-heading">
                        {trackingInfo.status === "delivered" ? "Pedido Entregue" : "Pedido em Transporte"}
                      </h2>
                      <p className="text-xs text-muted-foreground">Transportadora: {trackingInfo.carrier}</p>
                    </div>

                    <div className="flex flex-col md:items-end gap-2">
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={
                            trackingInfo.status === "delivered" 
                              ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-500 hover:bg-green-100 border-none px-2.5 py-1 text-xs font-semibold"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-500 hover:bg-blue-100 border-none px-2.5 py-1 text-xs font-semibold"
                          }
                        >
                          {trackingInfo.status === "delivered" ? "Entregue" : "Em Trânsito"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {trackingInfo.status === "delivered" ? "Entregue em: " : "Previsão de Entrega: "}
                          <strong className="text-foreground">{trackingInfo.estimatedDelivery}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-8 shadow-sm">
                    <h3 className="font-heading font-bold text-lg mb-6 border-b border-zinc-100 dark:border-zinc-800/60 pb-3">
                      Histórico do Envio
                    </h3>
                    
                    <div className="space-y-0">
                      {trackingInfo.steps.map((step, i) => {
                        const isLastStep = i === trackingInfo.steps.length - 1;
                        return (
                          <div key={step.title} className="flex gap-4">
                            <div className="flex flex-col items-center shrink-0">
                              <div 
                                className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                                  step.completed 
                                    ? "bg-primary border-primary text-primary-foreground" 
                                    : "bg-zinc-50 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 text-muted-foreground"
                                }`}
                              >
                                {step.title === "Entregue" ? (
                                  <CheckCircle2 className="h-4.5 w-4.5" />
                                ) : step.title === "Despachado" ? (
                                  <Truck className="h-4 w-4" />
                                ) : (
                                  <Package className="h-4 w-4" />
                                )}
                              </div>
                              {!isLastStep && (
                                <div 
                                  className={`w-0.5 h-12 transition-colors duration-300 ${
                                    step.completed && trackingInfo.steps[i+1].completed
                                      ? "bg-primary"
                                      : "bg-zinc-200 dark:bg-zinc-800"
                                  }`} 
                                />
                              )}
                            </div>
                            
                            <div className="pb-6 flex-1">
                              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                                <h4 className={`text-sm font-bold ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                                  {step.title}
                                </h4>
                                {step.date && (
                                  <span className="text-[10px] font-semibold text-muted-foreground bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded">
                                    {step.date} - {step.time}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="text-center pt-2">
                    <Button variant="ghost" onClick={handleReset} className="gap-2 text-xs">
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Rastrear outro pedido
                    </Button>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function RastreioLoading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-20 bg-zinc-50/40 dark:bg-zinc-950/20">
      <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
      <p className="text-sm text-muted-foreground">Carregando sistema de rastreamento...</p>
    </div>
  );
}

export default function RastreioPage() {
  return (
    <Suspense fallback={<RastreioLoading />}>
      <RastreioContent />
    </Suspense>
  );
}
