import { auth } from "@/lib/auth";

export const GET = auth(async (req) => {
  const session = await auth();
  console.log("Session:", session);
  if (req.auth) {
    return Response.json({ data: "Protected data" });
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 });
});
