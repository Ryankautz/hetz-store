/**
 * Utilitários de Máscaras para Inputs do Checkout
 */

export function maskCPF(value: string): string {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(value: string): string {
  const cleanValue = value.replace(/\D/g, "");
  if (cleanValue.length <= 10) {
    return cleanValue
      .slice(0, 10)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }
  return cleanValue
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

export function maskCEP(value: string): string {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue
    .slice(0, 8)
    .replace(/(\d{5})(\d{1,3})$/, "$1-$2");
}

export function maskCardNumber(value: string): string {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function maskExpiry(value: string): string {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue
    .slice(0, 4)
    .replace(/(\d{2})(\d{1,2})$/, "$1/$2");
}

export function maskCVV(value: string): string {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue.slice(0, 4);
}
