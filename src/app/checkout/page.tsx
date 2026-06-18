import type { Metadata } from "next";
import { CheckoutFlow } from "./CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout Seguro | Hetz Store",
  description: "Finalize sua compra com segurança na Hetz Store.",
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <CheckoutFlow />
    </div>
  );
}
