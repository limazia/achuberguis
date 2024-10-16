import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseURL() {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL || "";
  return url.startsWith("http") ? url : `https://${url}`;
}
