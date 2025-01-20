"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Session } from "next-auth";

export async function getAuthSession(): Promise<Session | null> {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Auth session error:", error);
    return null;
  }
}
