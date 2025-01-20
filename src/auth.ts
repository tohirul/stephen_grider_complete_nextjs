import NextAuth, { Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { database } from "./database";
import GitHub from "next-auth/providers/github";
import { NextApiRequest, NextApiResponse } from "next";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID) throw new Error("GITHUB_CLIENT_ID must be provided.");
if (!GITHUB_CLIENT_SECRET)
  throw new Error("GITHUB_CLIENT_SECRET must be provided.");

export const authOptions = {
  adapter: PrismaAdapter(database),
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, { ...authOptions });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}
