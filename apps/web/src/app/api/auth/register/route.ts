import { prisma } from "database";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Registering user...");
  const { email, password, name } = await req.json();
  console.log(email, password, name);
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "El email ya está registrado" },
      { status: 400 }
    );
  }
  console.log(existingUser);
  const hashed = await bcrypt.hash(password, 10);

  await prisma.$transaction(async (tx) => {
    const { id } = await tx.user.create({
      data: {
        email,
        name,
        password: hashed,
      },
    });

    await tx.account.create({
      data: {
        userId: id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: id,
      },
    });
  });

  return NextResponse.json({}, { status: 201 });
}
