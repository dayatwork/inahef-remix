import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireUser } from "~/utils/guard.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const loggedInUser = await requireUser(request);

  return json({ loggedInUser });
}

export default function App() {
  return <Outlet />;
}
