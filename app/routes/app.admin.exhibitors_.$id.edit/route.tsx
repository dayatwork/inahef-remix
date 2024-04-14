import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { ChevronRight } from "lucide-react";
import { z } from "zod";

import prisma from "~/lib/prisma.server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { requireRole } from "~/utils/guard.server";
import { Button } from "~/components/ui/button";
import { parseWithZod } from "@conform-to/zod";
import { redirectWithToast } from "~/utils/toast.server";
import { useForm } from "@conform-to/react";

const schema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email"),
  website: z.string().url("Invalid URL"),
  phone: z.string(),
  country: z.string(),
});

export async function action({ request, params }: ActionFunctionArgs) {
  const id = params.id;
  if (!id) {
    return redirect("/app/admin/exhibitors");
  }

  await requireRole(request, "ADMIN", "/app/home");

  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return json({ submission: submission.reply(), error: "" });
  }

  const { email, name, phone, website, country } = submission.value;

  try {
    await prisma.exhibitor.update({
      where: { id },
      data: { name, email, phone, website, country },
    });
    return redirectWithToast(`/app/admin/exhibitors/${id}/edit`, {
      description: "Exhibitor updated",
      type: "success",
    });
  } catch (err) {
    let error = "Something went wrong";
    if (err instanceof Error) {
      error = err.message;
    }
    return json({ submission: submission.reply(), error });
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) {
    return redirect("/app/admin/exhibitors");
  }

  const exhibitor = await prisma.exhibitor.findUnique({ where: { id } });
  if (!exhibitor) {
    return redirect("/app/admin/exhibitors");
  }

  return json({ exhibitor });
}

export default function EditExhibitor() {
  const actionData = useActionData<typeof action>();
  const { exhibitor } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  const [form, fields] = useForm({
    lastResult: actionData?.submission,
    shouldValidate: "onSubmit",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    defaultValue: {
      country: exhibitor.country,
      email: exhibitor.email,
      name: exhibitor.name,
      phone: exhibitor.phone,
      website: exhibitor.website,
    },
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/app/admin/exhibitors">Exhibitors</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="w-4 h-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="border rounded-xl p-6 max-w-md">
        <h1 className="font-bold text-lg mb-8">Edit Exhibitor</h1>
        <Form
          method="post"
          className="space-y-6"
          id={form.id}
          onSubmit={form.onSubmit}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={fields.name.initialValue}
            />
            {fields.name.errors ? (
              <p className="-mt-1.5 text-sm text-red-600 font-semibold">
                {fields.name.errors}
              </p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Company Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={fields.email.initialValue}
            />
            {fields.email.errors ? (
              <p className="-mt-1.5 text-sm text-red-600 font-semibold">
                {fields.email.errors}
              </p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Company Phone</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={fields.phone.initialValue}
            />
            {fields.phone.errors ? (
              <p className="-mt-1.5 text-sm text-red-600 font-semibold">
                {fields.phone.errors}
              </p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website">Company Website</Label>
            <Input
              id="website"
              name="website"
              defaultValue={fields.website.initialValue}
            />
            {fields.website.errors ? (
              <p className="-mt-1.5 text-sm text-red-600 font-semibold">
                {fields.website.errors}
              </p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              defaultValue={fields.country.initialValue}
            />
            {fields.country.errors ? (
              <p className="-mt-1.5 text-sm text-red-600 font-semibold">
                {fields.country.errors}
              </p>
            ) : null}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/app/admin/exhibitors")}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
}
