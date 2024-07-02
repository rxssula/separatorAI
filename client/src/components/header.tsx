import Link from "next/link";
import { MenuIcon, Music2Icon } from "./icons";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  return (
    <header className="bg-background border-b w-full fixed">
      <div className="container px-4 md:px-6 flex items-center justify-between h-16 mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Music2Icon className="w-6 h-6 text-primary" />
            <span className="font-bold text-primary">Audio Separation</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/vocal-remover"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Vocal Remover
            </Link>
            <Link
              href="/library"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Library
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full md:hidden">
            <div className="p-4 grid gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Audio Separation
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Vocal Remover
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Library
              </Link>
              <div className="flex gap-2">
                <Button variant="ghost">Sign In</Button>
                <Button>Sign Up</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
