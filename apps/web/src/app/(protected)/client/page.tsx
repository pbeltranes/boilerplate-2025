"use client";

import ClientExample from "@/components/client-example";
;

export default function ClientPageWithSession() {
  //   const session = await auth();
  //   if (session?.user) {
  //     // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
  //     // filter out sensitive data before passing to client.
  //     session.user = {
  //       name: session.user.name,
  //       email: session.user.email,
  //       image: session.user.image,
  //     };
  //   }

  return <ClientExample />;
}
