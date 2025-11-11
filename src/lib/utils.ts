import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// import { differenceInDays } from 'date-fns/esm';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
