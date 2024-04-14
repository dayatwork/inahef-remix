// import { useRouteLoaderData } from "@remix-run/react";
// import { loader as appLoader } from "../app/route";
import { ClientOnly } from "remix-utils/client-only";
import Ticket from "./ticket";
import { useLoggedInUser } from "~/utils/auth";

export default function Home() {
  // const loaderData = useRouteLoaderData<typeof appLoader>("routes/app");
  const loggedInUser = useLoggedInUser();

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-2">Welcome to INAHEF 2024,</h1>
      <p className="text-2xl font-bold mb-16 text-muted-foreground">
        {loggedInUser?.name}
      </p>

      {loggedInUser ? (
        <ClientOnly>
          {() => (
            <Ticket
              id={loggedInUser.id}
              name={loggedInUser.name}
              ticketNumber={1}
            />
          )}
        </ClientOnly>
      ) : null}
    </div>
  );
}
