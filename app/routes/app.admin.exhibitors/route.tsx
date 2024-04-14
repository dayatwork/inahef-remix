import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { MoreHorizontal, PenSquare, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

import { Button, buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import prisma from "~/lib/prisma.server";
import { requireRole } from "~/utils/guard.server";
import { action as deleteAction } from "../app.admin.exhibitors_.$id.delete/route";
import toast from "react-hot-toast";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireRole(request, "ADMIN", "/app/home");

  const exhibitors = await prisma.exhibitor.findMany();

  return json({ exhibitors });
}

export default function AdminExhibitors() {
  const { exhibitors } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedExhibitor, setSelectedExhibitor] = useState<
    (typeof exhibitors)[number] | null
  >(null);

  const fetcher = useFetcher<typeof deleteAction>();
  const deleting = fetcher.state === "submitting";
  const data = fetcher.data;

  useEffect(() => {
    if (data) {
      if (data.success) {
        toast.success("Exhibitor deleted");
        setSelectedExhibitor(null);
        setOpenDeleteModal(false);
      } else {
        toast.error(data.error);
      }
    }
  }, [data]);

  return (
    <>
      <AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Exhibitor {selectedExhibitor?.name}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <fetcher.Form
              method="POST"
              action={`${selectedExhibitor?.id}/delete`}
            >
              <AlertDialogAction asChild>
                <Button
                  type="submit"
                  variant="destructive"
                  className="bg-red-600 text-white hover:bg-red-700"
                  disabled={deleting}
                >
                  Yes, delete
                </Button>
              </AlertDialogAction>
            </fetcher.Form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Exhibitors</h1>
          <Link to="add" className={buttonVariants()}>
            Add Exhibitor
          </Link>
        </div>
        {exhibitors.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[80px] sm:table-cell">
                    <span className="sr-only">Logo</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exhibitors.map((exhibitor) => (
                  <TableRow key={exhibitor.id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="company logo"
                        className="aspect-square rounded object-contain"
                        src={exhibitor.logo || "/logo-placeholder.svg"}
                        width={44}
                        height={44}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {exhibitor.name}
                    </TableCell>
                    <TableCell>{exhibitor.email}</TableCell>
                    <TableCell>{exhibitor.phone}</TableCell>
                    <TableCell>{exhibitor.country}</TableCell>
                    <TableCell>
                      {new Date(exhibitor.createdAt).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "medium",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center h-full justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => navigate(`${exhibitor.id}/edit`)}
                            >
                              <PenSquare className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedExhibitor(exhibitor);
                                setOpenDeleteModal(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no exhibitors
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a exhibitor.
              </p>
              <Button className="mt-4">Add Exhibitor</Button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
