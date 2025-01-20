// "use server";
import { signOut as nextAuthSignOut } from "next-auth/react";

export async function sign_out() {
  if (typeof window !== "undefined") return await nextAuthSignOut();
}
