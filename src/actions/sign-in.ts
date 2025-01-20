// "use server";
import { signIn as nextAuthSignIn } from "next-auth/react";

export async function sign_in() {
  if (typeof window !== "undefined") {
    return await nextAuthSignIn("github");
  }
}
