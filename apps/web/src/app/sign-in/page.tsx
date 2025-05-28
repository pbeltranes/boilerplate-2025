"use client";
import { redirect, useSearchParams } from "next/navigation";
import { providerMap } from "../../lib/auth";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { Suspense } from "react";

const SIGNIN_ERROR_URL = "/error";

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInClient />
    </Suspense>
  );
}
function SignInClient() {
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signIn("credentials", { email, password });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
      }
      throw error;
    }
  };
  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto py-10">
      <form
        key="credentials"
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" id="password" required />
        </label>
        <input type="submit" value="Sign In" />
      </form>

      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            try {
              await signIn(provider.id, {
                redirectTo: searchParams.get("callbackUrl") ?? "",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <button type="submit" className="w-full py-2 border rounded">
            Sign in with {provider.name}
          </button>
        </form>
      ))}

      {}
    </div>
  );
}
