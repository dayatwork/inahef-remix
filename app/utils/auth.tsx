import { useMatches } from "@remix-run/react";
import { Role } from "@prisma/client";

import { LoggedInUserPayload } from "./guard.server";

export function useLoggedInUser() {
  const matches = useMatches();
  const data = matches.find((match) => match.id === "routes/app")?.data as
    | { loggedInUser: LoggedInUserPayload }
    | undefined;
  return data?.loggedInUser;
}

export function ProtectComponent({
  children,
  role,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const loggedInUser = useLoggedInUser();

  if (loggedInUser?.role === role) {
    return children;
  }

  return null;
}
