import Response from "@/models/response.type";
import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleRequestError<T>(error: unknown): Response<T> {
  if (isAxiosError(error)) {
    if (error.response) {
      return { error: error.response?.data };
    } else if (error.request) {
      console.error("Network error:", error.request);
      return {
        error: {
          message:
            "Une erreur réseau s'est produite. Veuillez réessayer plus tard ou vérifier votre connexion Internet.",
        },
      };
    } else {
      return { error: { message: "une erreur est survenu" } };
    }
  }
  return { error: { message: "une erreur est survenu" } };
}
