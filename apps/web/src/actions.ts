import { prisma } from "database";

export const register = async (
  credentials: Partial<Record<"email" | "password", unknown>>
) => {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Email and password are required");
  }
  // Check if user already exists
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = await prisma.user.findUnique({
    where: { email: credentials.email as string },
  });
};
