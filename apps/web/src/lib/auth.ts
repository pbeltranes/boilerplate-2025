import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "database";


// const prisma = new PrismaClient();
import CredentialsProvider from "next-auth/providers/credentials";
import { randomUUID } from "crypto";
import { encode } from "next-auth/jwt";

const providers: Provider[] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(
      credentials: Partial<Record<"email" | "password", unknown>>
    ) {
      if (!credentials?.email || !credentials?.password) return null;

      const user = await prisma.user.findUnique({
        where: { email: credentials.email as string },
      });

      if (!user) return null;

      const isValid = await bcrypt.compare(
        credentials.password as string,
        user.password as string
      );
      if (!isValid) return null;
      console.log("User authenticated:", user.email, isValid);
      return user;
    },
  }),
  GitHub,
];


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/login", // si quieres customizar
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, user, account }) {
      const adapter = PrismaAdapter(prisma);
      if (account?.provider === "credentials") {
        const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
        const sessionToken = randomUUID();

        const session = await adapter.createSession!({
          userId: user.id!,
          sessionToken,
          expires,
        });

        token.sessionId = session.sessionToken;
      }

      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    async encode(arg) {
      return (arg.token?.sessionId as string) ?? encode(arg);
    },
  },
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
  events: {
    async signOut(message) {
      if ("session" in message && message.session?.sessionToken) {
        await prisma.session.deleteMany({
          where: {
            sessionToken: message.session?.sessionToken,
          },
        });
      }
    },
  },
});
