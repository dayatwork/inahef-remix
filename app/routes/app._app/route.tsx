import { Link, Outlet } from "@remix-run/react";
import { ArrowRight, CircleUser, Menu, Package2 } from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { useLoggedInUser } from "~/utils/auth";
import logo from "~/assets/logo.png";

export default function AppLayoutHome() {
  const loggedInUser = useLoggedInUser();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 h-16 border-b bg-background">
        <div className="max-w-7xl mx-auto flex items-center h-full gap-4 px-4 md:px-6">
          <nav className="hidden flex-1 md:flex w-full gap-6 font-medium md:items-center md:gap-5 lg:gap-8">
            <Link
              to="/app/home"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <img
                src={logo}
                alt="logo"
                className="object-contain"
                width={40}
                height={40}
              />
              <span>INAHEF 2024</span>
            </Link>
            <Link
              to="/app/home"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/app/events"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Events
            </Link>
            <Link
              to="/app/exhibitors"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Exhibitors
            </Link>

            <Link
              to="/app/orders"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Orders
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="/app/home"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">INAHEF 2024</span>
                </Link>
                <Link to="/app/home" className="hover:text-foreground">
                  Home
                </Link>
                <Link
                  to="/app/events"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Events
                </Link>
                <Link
                  to="/app/exhibitors"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Exhibitors
                </Link>
                <Link
                  to="/app/orders"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Orders
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex gap-4 items-center">
            {loggedInUser?.role === "ADMIN" && (
              <Link
                to="/app/admin/dashboard"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Go to Admin Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action="/logout" method="post" className="w-full">
                    <button type="submit" className="flex w-full">
                      Logout
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="px-4 md:px-6 py-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
