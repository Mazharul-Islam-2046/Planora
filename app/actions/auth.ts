"use server";
import { signIn, signOut } from "@/auth";

export interface FormData {
  email: string;
  password: string;
}

export async function signInAction(formData: FormData) {
  await signIn("credentials", formData, {
    redirectTo: "/",
  });
}


export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  })
}