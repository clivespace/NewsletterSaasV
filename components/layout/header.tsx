import { CircleUser, Menu, Package2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden bg-transparent">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Newsletter SaaS</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/newsletters"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              Newsletters
            </Link>
            <Link
              href="/audience"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              Audience
            </Link>
            <Link href="/admin" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              Admin
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">{/* Can add breadcrumbs or search here */}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Demo User</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout (Demo)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
