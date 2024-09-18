import React from "react";
import { Heart } from "lucide-react";
import AuthTopbar from "../navigation/AuthTopbar";
import Link from "next/link";
import { Toaster } from "sonner";

export default function AuthLayout({ children }) {
  return (
    <main className="flex flex-col justify-between min-h-screen w-full">
      <AuthTopbar />
      <Toaster />
      <div className="h-full min-h-[87vh]">{children}</div>
      <footer className="flex flex-col gap-2 sm:flex-row py-2 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 Inditronics PVT LTD. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </main>
  );
}
