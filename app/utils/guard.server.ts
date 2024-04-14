import { Role, User } from "@prisma/client";
import { authenticator } from "./auth.server";
import { getUserById } from "~/services/user.server";
import { redirect } from "@remix-run/node";

export type LoggedInUserPayload =
  | Omit<User, "password"> & { hasPassword: boolean };

export async function requireUser(
  request: Request
): Promise<LoggedInUserPayload> {
  const { id } = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const loggedInUser = await getUserById({ id });
  if (!loggedInUser) {
    throw redirect("/login");
  }

  return loggedInUser;
}

export async function requireRole(
  request: Request,
  role: Role,
  failureRedirect?: string
): Promise<LoggedInUserPayload> {
  const { id } = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const loggedInUser = await getUserById({ id });

  if (!loggedInUser) {
    throw redirect("/login");
  }

  if (loggedInUser.role !== role) {
    throw redirect(failureRedirect || "/unauthorized");
  }

  return loggedInUser;
}
