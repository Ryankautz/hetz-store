/**
 * Utilitários de Validação para o Checkout
 */

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, "");
  if (cleanCPF.length !== 11) return false;
  
  // Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
}

export function validatePhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, "");
  return cleanPhone.length === 10 || cleanPhone.length === 11;
}

export function validateCEP(cep: string): boolean {
  const cleanCEP = cep.replace(/\D/g, "");
  return cleanCEP.length === 8;
}

export function validateCardNumber(cardNumber: string): boolean {
  const cleanCard = cardNumber.replace(/\D/g, "");
  return cleanCard.length === 16;
}

export function validateExpiry(expiry: string): boolean {
  const cleanExpiry = expiry.replace(/\D/g, "");
  if (cleanExpiry.length !== 4) return false;

  const month = parseInt(cleanExpiry.substring(0, 2));
  const year = parseInt("20" + cleanExpiry.substring(2, 4));

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-indexed
  const currentYear = now.getFullYear();

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
}

export function validateCVV(cvv: string): boolean {
  const cleanCVV = cvv.replace(/\D/g, "");
  return cleanCVV.length === 3 || cleanCVV.length === 4;
}
