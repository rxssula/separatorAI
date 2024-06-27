/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9i8BQEaEz5Z
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";

export default function FileUpload() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container px-4 md:px-6 flex items-center justify-between h-16 mx-auto">
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <Music2Icon className="w-6 h-6 text-primary" />
              <span className="font-bold text-primary">Audio Separation</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh_-_theme(spacing.16))] bg-background">
        <div className="w-full max-w-4xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                Audio Stem Separation
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Upload your audio file and let our AI separate it into
                individual stems.
              </p>
              <div className="w-full bg-muted rounded-lg p-6 flex flex-col items-center justify-center border-2 border-dashed border-primary hover:border-primary-foreground cursor-pointer transition-colors">
                <UploadIcon className="w-12 h-12 mb-4 text-primary" />
                <input type="file" className="sr-only" accept="audio/*" />
                <p className="text-muted-foreground text-sm">
                  Drag and drop your audio file or click to upload
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                Separated Stems
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Listen to or download the individual stems.
              </p>
              <div className="w-full bg-muted rounded-lg p-6 border">
                <div className="flex items-center mb-4">
                  <MicIcon className="w-6 h-6 mr-2 text-primary" />
                  <h3 className="text-lg font-medium">Vocals</h3>
                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <PlayIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <DownloadIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <Progress value={75} className="mb-4" />
                <div className="flex items-center mb-4">
                  <DrumIcon className="w-6 h-6 mr-2 text-primary" />
                  <h3 className="text-lg font-medium">Drums</h3>
                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <PlayIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <DownloadIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <Progress value={90} className="mb-4" />
                <div className="flex items-center mb-4">
                  <GuitarIcon className="w-6 h-6 mr-2 text-primary" />
                  <h3 className="text-lg font-medium">Guitar</h3>
                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <PlayIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <DownloadIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <Progress value={60} className="mb-4" />
                <div className="flex items-center mb-4">
                  <FishIcon className="w-6 h-6 mr-2 text-primary" />
                  <h3 className="text-lg font-medium">Bass</h3>
                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <PlayIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <DownloadIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <Progress value={80} className="mb-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function DrumIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 2 8 8" />
      <path d="m22 2-8 8" />
      <ellipse cx="12" cy="9" rx="10" ry="5" />
      <path d="M7 13.4v7.9" />
      <path d="M12 14v8" />
      <path d="M17 13.4v7.9" />
      <path d="M2 9v8a10 5 0 0 0 20 0V9" />
    </svg>
  );
}

function FishIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
      <path d="M18 12v.5" />
      <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
      <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
      <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
      <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
    </svg>
  );
}

function GuitarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m20 7 1.7-1.7a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0L17 4v3Z" />
      <path d="m17 7-5.1 5.1" />
      <circle cx="11.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M6 12a2 2 0 0 0 1.8-1.2l.4-.9C8.7 8.8 9.8 8 11 8c2.8 0 5 2.2 5 5 0 1.2-.8 2.3-1.9 2.8l-.9.4A2 2 0 0 0 12 18a4 4 0 0 1-4 4c-3.3 0-6-2.7-6-6a4 4 0 0 1 4-4" />
      <path d="m6 16 2 2" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function Music2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="18" r="4" />
      <path d="M12 18V2l7 4" />
    </svg>
  );
}

function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
