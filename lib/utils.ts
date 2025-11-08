import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function saltAndHashPassword(password: string) {
  return password;
}



export function getUserFromDb(email: string, password: string) {
  return {
    email,
    password,
  }
}
