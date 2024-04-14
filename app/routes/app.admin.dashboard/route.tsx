import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Store, Users } from "lucide-react";
import dayjs from "dayjs";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import prisma from "~/lib/prisma.server";
import { requireRole } from "~/utils/guard.server";
import { cn } from "~/lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireRole(request, "ADMIN", "/app/home");
  const [
    totalExhibitors,
    totalExhibitorsInLastDay,
    totalVisitors,
    totalVisitorsInLastDay,
  ] = await Promise.all([
    prisma.exhibitor.count(),
    prisma.exhibitor.count({
      where: { createdAt: { gte: dayjs().subtract(1, "day").toDate() } },
    }),
    prisma.user.count({ where: { role: "VISITOR" } }),
    prisma.user.count({
      where: {
        role: "VISITOR",
        createdAt: { gte: dayjs().subtract(1, "day").toDate() },
      },
    }),
  ]);

  return json({
    totalExhibitors,
    totalExhibitorsInLastDay,
    totalVisitors,
    totalVisitorsInLastDay,
  });
}

export default function AdminDashboard() {
  const {
    totalExhibitors,
    totalExhibitorsInLastDay,
    totalVisitors,
    totalVisitorsInLastDay,
  } = useLoaderData<typeof loader>();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium">Total Exhibitors</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{totalExhibitors}</div>
            <p
              className={cn(
                "text-sm",
                totalExhibitorsInLastDay > 0
                  ? "text-green-600"
                  : "text-muted-foreground"
              )}
            >
              +{totalExhibitorsInLastDay} since last day
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{totalVisitors}</div>
            <p
              className={cn(
                "text-sm",
                totalVisitorsInLastDay > 0
                  ? "text-green-600"
                  : "text-muted-foreground"
              )}
            >
              +{totalVisitorsInLastDay} since last day
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
