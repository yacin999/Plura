import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function getStripeOAuthLink (accountType : "agency" | "subaccount", state : string) {
  return `https://marketplace.stripe.com/oauth/v2/authorize?client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}&state=${state}`
}