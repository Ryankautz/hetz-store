"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import { toast } from "sonner";
import {
  maskCPF,
  maskPhone,
  maskCEP,
  maskCardNumber,
  maskExpiry,
  maskCVV,
} from "@/lib/masks";
import {
  validateEmail,
  validateCPF,
  validatePhone,
  validateCEP,
  validateCardNumber,
  validateExpiry,
  validateCVV,
} from "@/lib/validations";

type CheckoutStep = "personal" | "address" | "payment" | "success";

export function CheckoutFlow() {
  const { items: cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<CheckoutStep>("personal");
  const [isMounted, setIsMounted] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Form states
  const [personal, setPersonal] = useState({ name: "", email: "", phone: "", document: "" });
  const [address, setAddress] = useState({ zip: "", street: "", number: "", comp: "", district: "", city: "", state: "" });
  const [card, setCard] = useState({ number: "", holderName: "", expiry: "", cvv: "" });
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect if cart is empty and not on success step
  useEffect(() => {
    if (isMounted && cartItems.length === 0 && step !== "success") {
      router.push("/");
    }
  }, [isMounted, cartItems, step, router]);

  if (!isMounted || (cartItems.length === 0 && step !== "success")) {
    return null; // Return null while checking to prevent flicker
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  };

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personal.name || !personal.email || !personal.document || !personal.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (!validateEmail(personal.email)) {
      toast.error("Por favor, informe um e-mail válido.");
      return;
    }
    if (!validateCPF(personal.document)) {
      toast.error("Por favor, informe um CPF válido.");
      return;
    }
    if (!validatePhone(personal.phone)) {
      toast.error("Por favor, informe um telefone válido.");
      return;
    }
    setStep("address");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCep = maskCEP(e.target.value);
    setAddress((prev) => ({ ...prev, zip: maskedCep }));

    const cleanCep = maskedCep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setIsFetchingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (data.erro) {
          toast.error("CEP não encontrado. Digite o endereço manualmente.");
        } else {
          setAddress((prev) => ({
            ...prev,
            street: data.logradouro || prev.street,
            district: data.bairro || prev.district,
            city: data.localidade || prev.city,
            state: data.uf || prev.state,
          }));
          toast.success("Endereço preenchido com sucesso!");
          setTimeout(() => {
            const numberInput = document.getElementById("number-input");
            if (numberInput) numberInput.focus();
          }, 100);
        }
      } catch (error) {
        toast.error("Erro ao buscar o CEP. Digite o endereço manualmente.");
      } finally {
        setIsFetchingCep(false);
      }
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.zip || !address.street || !address.number || !address.district || !address.city || !address.state) {
      toast.error("Por favor, preencha todos os campos de endereço obrigatórios.");
      return;
    }
    if (!validateCEP(address.zip)) {
      toast.error("Por favor, informe um CEP válido.");
      return;
    }
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === "credit_card") {
      if (!card.number || !card.holderName || !card.expiry || !card.cvv) {
        toast.error("Por favor, preencha todos os dados do cartão.");
        return;
      }
      if (!validateCardNumber(card.number)) {
        toast.error("Número de cartão inválido (deve conter 16 dígitos).");
        return;
      }
      if (!validateExpiry(card.expiry)) {
        toast.error("Validade do cartão vencida ou no formato incorreto (MM/AA).");
        return;
      }
      if (!validateCVV(card.cvv)) {
        toast.error("Código CVV inválido (deve conter 3 ou 4 dígitos).");
        return;
      }
    }

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const newOrderId = `HZ-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(newOrderId);
    setIsProcessing(false);
    clearCart();
    setStep("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const steps = [
    { id: "personal", label: "Dados Pessoais", icon: <User className="w-4 h-4" /> },
    { id: "address", label: "Endereço", icon: <MapPin className="w-4 h-4" /> },
    { id: "payment", label: "Pagamento", icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl flex-1">
      {/* Header / Progress */}
      {step !== "success" && (
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-3xl mx-auto relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full z-0" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500"
              style={{ 
                width: step === "personal" ? "0%" : step === "address" ? "50%" : "100%" 
              }} 
            />
            
            {steps.map((s, i) => {
              const isActive = step === s.id;
              const isPast = steps.findIndex((x) => x.id === step) > i;
              return (
                <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 border-2 ${
                      isActive 
                        ? "bg-primary border-primary text-primary-foreground shadow-md" 
                        : isPast 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : "bg-zinc-50 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-muted-foreground"
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : s.icon}
                  </div>
                  <span className={`text-xs font-semibold ${isActive || isPast ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Formulários (Lado Esquerdo) */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {step === "personal" && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-lg"><User className="w-5 h-5" /></div>
                  <h2 className="text-xl font-heading font-bold">Seus Dados</h2>
                </div>
                <form onSubmit={handlePersonalSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome Completo</label>
                    <Input required value={personal.name} onChange={(e) => setPersonal({...personal, name: e.target.value})} placeholder="Ex: João da Silva" className="bg-zinc-50 dark:bg-zinc-900" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">E-mail</label>
                      <Input required type="email" value={personal.email} onChange={(e) => setPersonal({...personal, email: e.target.value})} placeholder="joao@exemplo.com" className="bg-zinc-50 dark:bg-zinc-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CPF / CNPJ</label>
                      <Input required value={personal.document} onChange={(e) => setPersonal({...personal, document: maskCPF(e.target.value)})} placeholder="000.000.000-00" className="bg-zinc-50 dark:bg-zinc-900" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Telefone / WhatsApp</label>
                    <Input required type="tel" value={personal.phone} onChange={(e) => setPersonal({...personal, phone: maskPhone(e.target.value)})} placeholder="(00) 90000-0000" className="bg-zinc-50 dark:bg-zinc-900" />
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-6 gap-2">
                    Continuar para Endereço <ChevronRight className="w-4 h-4" />
                  </Button>
                </form>
              </motion.div>
            )}

            {step === "address" && (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-lg"><MapPin className="w-5 h-5" /></div>
                  <h2 className="text-xl font-heading font-bold">Endereço de Entrega</h2>
                </div>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-medium flex items-center gap-2">
                        CEP {isFetchingCep && <span className="text-xs text-primary animate-pulse">(Buscando...)</span>}
                      </label>
                      <Input required value={address.zip} onChange={handleCepChange} disabled={isFetchingCep} placeholder="00000-000" className="bg-zinc-50 dark:bg-zinc-900 disabled:opacity-75" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Rua / Avenida</label>
                      <Input required value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} placeholder="Nome da rua" className="bg-zinc-50 dark:bg-zinc-900" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Número</label>
                      <Input id="number-input" required value={address.number} onChange={(e) => setAddress({...address, number: e.target.value})} placeholder="123" className="bg-zinc-50 dark:bg-zinc-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Complemento <span className="text-muted-foreground font-normal">(Opcional)</span></label>
                      <Input value={address.comp} onChange={(e) => setAddress({...address, comp: e.target.value})} placeholder="Apto 101" className="bg-zinc-50 dark:bg-zinc-900" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-medium">Bairro</label>
                      <Input required value={address.district} onChange={(e) => setAddress({...address, district: e.target.value})} className="bg-zinc-50 dark:bg-zinc-900" />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-medium">Cidade</label>
                      <Input required value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="bg-zinc-50 dark:bg-zinc-900" />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-medium">Estado</label>
                      <Input required value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} placeholder="UF" className="bg-zinc-50 dark:bg-zinc-900" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep("personal")} className="w-1/3">
                      Voltar
                    </Button>
                    <Button type="submit" size="lg" className="w-2/3 gap-2">
                      Ir para Pagamento <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-lg"><CreditCard className="w-5 h-5" /></div>
                  <h2 className="text-xl font-heading font-bold">Pagamento</h2>
                </div>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "credit_card" ? "border-primary bg-primary/5" : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="credit_card" checked={paymentMethod === "credit_card"} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Cartão de Crédito (até 12x sem juros)</span>
                      </div>
                    </label>
                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="pix" checked={paymentMethod === "pix"} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Pix (10% de desconto)</span>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600 border-none">-10% OFF</Badge>
                    </label>
                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "boleto" ? "border-primary bg-primary/5" : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="boleto" checked={paymentMethod === "boleto"} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Boleto Bancário</span>
                      </div>
                    </label>
                  </div>

                  {/* Mock Credit Card Form */}
                  {paymentMethod === "credit_card" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Número do Cartão</label>
                        <Input required value={card.number} onChange={(e) => setCard({...card, number: maskCardNumber(e.target.value)})} placeholder="0000 0000 0000 0000" className="bg-zinc-50 dark:bg-zinc-900" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nome Impresso no Cartão</label>
                        <Input required value={card.holderName} onChange={(e) => setCard({...card, holderName: e.target.value.toUpperCase()})} placeholder="JOAO DA SILVA" className="bg-zinc-50 dark:bg-zinc-900" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Validade</label>
                          <Input required value={card.expiry} onChange={(e) => setCard({...card, expiry: maskExpiry(e.target.value)})} placeholder="MM/AA" className="bg-zinc-50 dark:bg-zinc-900" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">CVV</label>
                          <Input required value={card.cvv} onChange={(e) => setCard({...card, cvv: maskCVV(e.target.value)})} placeholder="123" type="password" maxLength={4} className="bg-zinc-50 dark:bg-zinc-900" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Parcelamento</label>
                        <select className="w-full h-10 rounded-md border border-input bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm">
                          <option>1x de {formatPrice(cartTotal)} sem juros</option>
                          <option>2x de {formatPrice(cartTotal / 2)} sem juros</option>
                          <option>3x de {formatPrice(cartTotal / 3)} sem juros</option>
                          <option>6x de {formatPrice(cartTotal / 6)} sem juros</option>
                          <option>12x de {formatPrice(cartTotal / 12)} sem juros</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-500 p-3 rounded-lg mt-4">
                    <Lock className="w-4 h-4" />
                    Ambiente 100% seguro e criptografado
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep("address")} className="w-1/3" disabled={isProcessing}>
                      Voltar
                    </Button>
                    <Button type="submit" variant="gradient" size="lg" className="w-2/3 gap-2" disabled={isProcessing}>
                      {isProcessing ? "Processando..." : "Finalizar Compra"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-16 text-center max-w-2xl mx-auto"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-500" />
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Pedido Confirmado!</h1>
                <p className="text-muted-foreground text-lg mb-2">
                  Obrigado pela sua compra, {personal.name.split(" ")[0]}!
                </p>
                <p className="text-muted-foreground mb-8">
                  Enviamos um e-mail para <strong className="text-foreground">{personal.email}</strong> com os detalhes do seu pedido.
                </p>

                <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 text-left mb-8">
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">Resumo do Pedido</h3>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Número do Pedido</p>
                      <p className="font-semibold">{orderId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Previsão de Entrega</p>
                      <p className="font-semibold">3 a 5 dias úteis</p>
                    </div>
                    <div className="col-span-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <p className="text-xs text-muted-foreground mb-1">Endereço de Entrega</p>
                      <p className="font-medium text-sm">
                        {address.street}, {address.number} {address.comp && ` - ${address.comp}`}<br/>
                        {address.district} - {address.city}/{address.state} - CEP: {address.zip}
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/">
                  <Button size="lg" className="w-full sm:w-auto px-8 gap-2">
                    <ShoppingBag className="w-4 h-4" /> Continuar Comprando
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Resumo do Pedido (Lado Direito) */}
        {step !== "success" && (
          <div className="w-full lg:w-[400px]">
            <div className="sticky top-24 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="bg-zinc-100 dark:bg-zinc-800 text-foreground p-2 rounded-lg"><ShoppingBag className="w-5 h-5" /></div>
                <h2 className="text-xl font-heading font-bold">Resumo do Pedido</h2>
              </div>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0 overflow-hidden">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Qtd: {item.quantity}</p>
                      <p className="text-sm font-bold mt-1 text-primary">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-semibold text-green-600 dark:text-green-500">Grátis</span>
                </div>
                
                {paymentMethod === "pix" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Desconto Pix (10%)</span>
                    <span className="font-semibold text-green-600 dark:text-green-500">-{formatPrice(cartTotal * 0.1)}</span>
                  </div>
                )}
                
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-foreground">
                      {formatPrice(paymentMethod === "pix" ? cartTotal * 0.9 : cartTotal)}
                    </span>
                    {paymentMethod !== "pix" && (
                      <p className="text-xs text-muted-foreground mt-1">Em até 12x s/ juros</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
