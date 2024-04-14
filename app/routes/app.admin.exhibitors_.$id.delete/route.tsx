import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import prisma from "~/lib/prisma.server";
import { requireRole } from "~/utils/guard.server";

export async function action({ request, params }: ActionFunctionArgs) {
  const id = params.id;
  if (!id) {
    return redirect("/app/admin/exhibitors");
  }

  await requireRole(request, "ADMIN", "/app/home");

  try {
    await prisma.exhibitor.delete({
      where: { id },
    });
    return json({ success: true, error: "", datetime: new Date() });
  } catch (err) {
    let error = "Something went wrong";
    if (err instanceof Error) {
      error = err.message;
    }
    return json({ success: false, error, datetime: new Date() });
  }
}
