import { auth } from "@/lib/auth";

export default async function ClientExample() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Client Side Rendering</h1>
      <p>This page fetches session data client side using the React Hook.</p>
      <p>
        It needs the directive at the top of the file to enable client side
        rendering, and the {JSON.stringify(status)}
        component in{" "}
        <strong>
          <code>client-example/page.tsx</code>
        </strong>{" "}
        to provide the session data.
      </p>

      <div className="flex flex-col gap-4 rounded-md p-4">
        <h2 className="text-xl font-bold">Third-party backend integration</h2>
        <p>
          Press the button to send a request to our{" "}
          {/* <CustomLink href="https://github.com/nextauthjs/authjs-third-party-backend">
            <code>example backend</code>
          </CustomLink>
          . Read more{" "}
          <CustomLink href="https://authjs.dev/guides/integrating-third-party-backends">
            <code>here</code>
          </CustomLink> */}
        </p>
        <div className="flex flex-col">
          {/* <button
            disabled={!session?.accessToken}
            onClick={makeRequestWithToken}
          >
            Make API Request
          </button> */}
        </div>
        <pre>{JSON.stringify(session)}</pre>
        <p className="italic">
          Note: This example only works when using the Keycloak provider.
        </p>
      </div>

      {/* {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        // <SessionData session={session} />
      )} */}
      {/* <UpdateForm /> */}
    </div>
  );
}
